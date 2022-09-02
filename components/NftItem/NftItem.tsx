import {
  NFT,
  ThirdwebNftMedia,
  useAddress,
  useClaimNFT,
  useMintNFT,
  useNFTCollection,
  useNFTDrop,
} from "@thirdweb-dev/react";
import { NFTCollection } from "@thirdweb-dev/sdk";
import Image from "next/image";
import styles from "./NftItem.module.css";
const NftItem = ({ nft }: { nft: any }) => {
  const address = useAddress();
  const CONTRACT_ADDRESS = "0x56Fd0bFeF24e0526CD3dD641CDaAf31CBa2d957F";
  // Get the NFT collection using its contract address
  const nftDrop = useNFTDrop(CONTRACT_ADDRESS);
  const { mutate: claimNft, isLoading, error } = useClaimNFT(nftDrop);

  if (error) {
    console.error("failed to claim nft", error);
  }
  return (
    <div className={styles.NftItem}>
      {/* <ThirdwebNftMedia metadata={nft.metadata} /> */}
      <Image
        alt={nft.metadata.description}
        src={nft.metadata.image}
        width={320}
        height={320}
      ></Image>
      <div className={styles.Bottom}>
        <div className={styles.NftDesc}>
          {nft.metadata.description}
          <br></br>
          <a
            style={{ textDecoration: "undelined", color: "blue" }}
            target="_blank"
            rel="noreferrer"
            href={nft.metadata.image}
          >
            View full image
          </a>
        </div>
        {address && (
          <button
            className={styles.MintBtn}
            onClick={() => claimNft({ to: address, quantity: 1 })}
          >
            0.05AVAX
          </button>
        )}
      </div>
    </div>
  );
};

export default NftItem;
