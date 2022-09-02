import {
  useContract,
  useNFTDrop,
  useUnclaimedNFTs,
  useNFTCollection,
  useNFTs,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Container from "../components/Container";
import styles from "../styles/Home.module.css";
const NftItem_ = dynamic(() => import("../components/NftItem/NftItem"));
const Home: NextPage = () => {
  const CONTRACT_ADDRESS = "0x56Fd0bFeF24e0526CD3dD641CDaAf31CBa2d957F";
  // Get the NFT collection using its contract address
  const nftCollection = useNFTCollection(CONTRACT_ADDRESS);

  // Load all the NFTs from the collection (with a loading flag)
  const { data: nfts, isLoading } = useNFTs(nftCollection);
  console.log(nfts);
  return (
    <Container>
      <div className={styles.NftContainer}>
        {!isLoading ? (
          <>
            {nfts?.map((nft) => (
              <NftItem_ nft={nft} key={nft.metadata.id.toString()} />
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Container>
  );
};

export default Home;
