import { useEffect, useState } from "react";
import axios from "axios";
import { useProblemContext } from "@/context/ProblemContext";
import AnimatedCard from "./ui/animatedCard";

export default function SubmissionsTab() {
  const [submissions, setSubmissions] = useState<[]>([]);
  const {selectedProblem} = useProblemContext();

  useEffect(() => {
    fetchRecentSubmissions();
  }, [selectedProblem]);

  const fetchRecentSubmissions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_DOMAIN}+/submissions/problem/${selectedProblem?._id}`);
      console.log(response.data);
      setSubmissions(response.data);
    } catch (error) {
      console.error("Error fetching recent submissions:", error);
    }
  };

  return <div className="flex-1 overflow-auto">{
    submissions.map((submission:any)=>{
      return (<AnimatedCard
        problemId={submission._id}
        title={submission.problem.title}
        code={submission.code}
        language={submission.language}
      />)
    })
  }</div>;
}
