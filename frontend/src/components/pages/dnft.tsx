import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AnimatedCard from "@/components/ui/animatedCard";
interface NFTData {
  title: string;
  code: string;
  language: string;
}

async function getNFT(id: string): Promise<NFTData> {
  try {
    const response = await axios.get(`${import.meta.env.VITE_DOMAIN}/submissions/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    return {
      title: response.data.problem.title,
      code: response.data.code,
      language: response.data.language,
    };
  } catch (error) {
    console.error("Error fetching NFT data:", error);
    throw error;
  }
}

export const DNFT: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nft, setNFT] = useState<NFTData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getNFT(id)
        .then((data) => {
          setNFT(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error in DNFT component:", err);
          setError("Failed to load NFT data. Please try again.");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!nft) {
    return <div>No NFT data found.</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <AnimatedCard problemId="0" title={nft.title} code={nft.code} language={nft.language} />
    </div>
  );
};

export default DNFT;
