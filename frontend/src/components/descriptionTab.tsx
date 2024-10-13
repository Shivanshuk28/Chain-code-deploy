import { useProblemContext } from "@/context/ProblemContext";
import ReactMarkdown from "react-markdown";

export default function DescriptionTab() {
  const { selectedProblem } = useProblemContext();

  return (
    <div className="flex-1">
      {selectedProblem ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">{selectedProblem.title}</h2>
          <ReactMarkdown>{selectedProblem.description}</ReactMarkdown>
        </div>
      ) : (
        <p>Select a problem to view its description.</p>
      )}
    </div>
  );
}