import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimatedCard from "@/components/ui/animatedCard.tsx";

async function getNFTs() {
  const result = (
    await axios.get(`${import.meta.env.VITE_DOMAIN}/submissions/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  ).data;
  console.log(result);
  return result;
}
const NFTPage: React.FC = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    getNFTs().then((result) => {
      setNfts(result);
    });
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">MY NFTS</h1>
      <div className="flex flex-wrap justify-center gap-40">
        {nfts.map((nft: any, index: number) => (
          <div key={nft._id} className="flex flex-col items-center">
            <AnimatedCard
              problemId={nft.problem._id}
              title={nft.problem.title}
              code={nft.code}
              language={nft.language}
            />
            <p className="text-white mt-2">NFT {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTPage;
