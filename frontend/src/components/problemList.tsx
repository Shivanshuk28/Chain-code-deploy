import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProblemContext } from "@/context/ProblemContext";

export default function ProblemList() {
  const { problems, fetchProblemById, isLoading, error } = useProblemContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProblems, setFilteredProblems] = useState(problems);
  const problemsPerPage = 10;

  useEffect(() => {
    const filtered = problems.filter((problem) =>
      problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProblems(filtered);
    setCurrentPage(1);
  }, [searchTerm, problems]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleProblemSelect = (problemId: string) => {
    fetchProblemById(problemId);
  };

  if (isLoading) {
    return <div>Loading problems...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Problem List</h2>
      <Input
        className="mb-4"
        placeholder="Search problems..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ScrollArea className="h-[calc(100vh-200px)]">
        {filteredProblems
          .slice(
            (currentPage - 1) * problemsPerPage,
            currentPage * problemsPerPage
          )
          .map((problem) => (
            <Button
              key={problem._id}  // Changed from problem.id to problem._id
              variant="ghost"
              className="w-full justify-start mb-2"
              onClick={() => handleProblemSelect(problem._id)}
            >
              {/* <span className="mr-2">{problem.title}.</span> */}
              <span className="flex-grow text-left">{problem.title}</span>
              <span
                className={`text-xs ${
                  problem.difficulty === "Easy"
                    ? "text-green-500"
                    : problem.difficulty === "Medium"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {problem.difficulty}
              </span>
            </Button>
          ))}
      </ScrollArea>
      <div className="flex justify-between mt-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of{" "}
          {Math.ceil(filteredProblems.length / problemsPerPage)}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(filteredProblems.length / problemsPerPage)
          }
        >
          Next
        </Button>
      </div>
    </>
  );
}
