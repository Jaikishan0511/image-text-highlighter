import React, { useState, useRef, useEffect } from "react";
import BoxOverlay from "../common/BoxOverlay";
import Tesseract from "tesseract.js";
import stringSimilarity from "string-similarity";
import CustomLoader from '../common/CustomLoader';
import CustomMemoizedImage from "../common/CustomMemoizedImage";

const RightScreen = ({ selectedField ,isLoading, setIsLoading}) => {
  const imageRef = useRef(null);
  const [fieldPositions, setFieldPositions] = useState([]);

  useEffect(() => {
    const recognizeText = async () => {
      setIsLoading(true);
      try {
        const result = await Tesseract.recognize(imageRef.current, "eng", {
          logger: (info) => console.log("recogniation running"),
        });

        const lowerCaseSelectedField = selectedField.map((keyword) =>
          keyword.toLowerCase()
        );
        const positions = [];

        lowerCaseSelectedField.forEach((keyword, keywordIndex) => {
          const keywordOccurrences = result.data.words
            .map((word, index) =>
              stringSimilarity.compareTwoStrings(
                word.text.toLowerCase(),
                keyword
              ) > 0.7
                ? index
                : null
            )
            .filter((index) => index !== null);

          if (keywordOccurrences.length > 0) {
            const consecutiveOccurrences = [];
            let currentSequence = [keywordOccurrences[0]];

            for (let i = 1; i < keywordOccurrences.length; i++) {
              if (
                keywordOccurrences[i] ===
                currentSequence[currentSequence.length - 1] + 1
              ) {
                // Words are on the same line
                currentSequence.push(keywordOccurrences[i]);
              } else {
                // Words are on the next line, treat the current sequence as a complete occurrence
                consecutiveOccurrences.push(currentSequence);
                currentSequence = [keywordOccurrences[i]];
              }
            }

            // Handle the last set of consecutive words
            consecutiveOccurrences.push(currentSequence);

            // create boxes for each set of consecutive occurrences
            consecutiveOccurrences.forEach((occurrences) => {
              const wordsSlice = result.data.words.slice(
                occurrences[0],
                occurrences[occurrences.length - 1] + 1
              );
              const position = calculateBoundingBox(wordsSlice);
              positions.push(position);
            });
          }
        });

        if (positions.length > 0) {
          // Check if there are multiple instances
          if (positions.length > 1) {
            setFieldPositions(positions);
          } else {
            // Create a single box for the entire selected field
            const overallPosition = positions[0];
            setFieldPositions([overallPosition]);
          }
        } else {
          // Handle the case where the combination is not found
          console.log("Combination not found");
          setFieldPositions([]);
        }

        function calculateBoundingBox(wordsSlice) {
          const x0 = Math.min(...wordsSlice.map((word) => word.bbox.x0));
          const x1 = Math.max(...wordsSlice.map((word) => word.bbox.x1));
          const y0 = Math.min(...wordsSlice.map((word) => word.bbox.y0));
          const y1 = Math.max(...wordsSlice.map((word) => word.bbox.y1));

          const scaleWidth =
            imageRef.current.width / imageRef.current.naturalWidth;
          const scaleHeight =
            imageRef.current.height / imageRef.current.naturalHeight;

          return {
            x0: x0 * scaleWidth,
            x1: x1 * scaleWidth,
            y0: y0 * scaleHeight,
            y1: y1 * scaleHeight,
          };
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error recognizing text:", error);
      }
    };

    if (selectedField?.length > 0) {
      recognizeText();
    }
  }, [selectedField]);

  return (
    <div className="right-screen" style={{ position: "relative" }}>
      <CustomMemoizedImage imageRef={imageRef}/>
      {isLoading && <CustomLoader />}
      {fieldPositions.map((position, index) => (
        <BoxOverlay key={index} position={position} />
      ))}
    </div>
  );
};

export default RightScreen;
