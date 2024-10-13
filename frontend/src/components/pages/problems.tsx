import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/navbar";
import CodeEditor from "@/components/codeEditor";
import DescriptionTab from "@/components/descriptionTab";
import SubmissionsTab from "@/components/submissionTab";
import { useProblemContext } from "@/context/ProblemContext";

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
];

const languageTemplates = {
  javascript: "// Your JavaScript code here",
  python: "# Your Python code here",
  java: "// Your Java code here",
  cpp: "// Your C++ code here",
};

interface ProblemsProps {
  handleLogout: () => void;
}

export default function Problems({ handleLogout }: ProblemsProps) {
  const { language, setLanguage, setCode } = useProblemContext();

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(languageTemplates[value as keyof typeof languageTemplates]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar onLogout={handleLogout} />
      <div className="flex-1 p-4">
        <Tabs defaultValue="description" className="h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <TabsContent value="description">
            <DescriptionTab />
          </TabsContent>
          <TabsContent value="solution">
            <CodeEditor />
          </TabsContent>
          <TabsContent value="submission">
            <SubmissionsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
