"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import type { NFT } from "@/lib/nft-service";

export default function NFTCard({ nft }: { nft: NFT }) {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "/abstract-nft-concept.png";

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square relative">
        <Image
          src={imageError ? fallbackImage : nft.image || fallbackImage}
          alt={nft.name}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg truncate">{nft.name}</CardTitle>
        {nft.collection && (
          <p className="text-sm text-muted-foreground truncate">
            {nft.collection}
          </p>
        )}
      </CardHeader>
      {nft.description && (
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {nft.description}
          </p>
        </CardContent>
      )}
      <CardFooter className="p-4 pt-0 flex justify-end">
        {nft.link && (
          <a
            href={nft.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground"
          >
            View on OpenSea <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
