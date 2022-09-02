import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import dynamic from "next/dynamic";
import Container from "../components/Container";
import styles from '../styles/Profile.module.css'
const NftItem_ = dynamic(() => import("../components/NftItem/NftItem"));
const ProfilePage = () => {
  const address = useAddress();

  const CONTRACT_ADDRESS = "0x56Fd0bFeF24e0526CD3dD641CDaAf31CBa2d957F";
  const { contract } = useContract(CONTRACT_ADDRESS);
  const {
    data: ownedNFTs,
    isLoading,
    error,
  } = useOwnedNFTs(contract?.nft, address);
  if (!address)
    return (
      <Container>
        <h1>Connect your wallet to see stuff</h1>
      </Container>
    );
  if (!ownedNFTs || !ownedNFTs.length)
    return (
      <Container>
        <h1>You don't own any NFTs and you will never be happy</h1>
      </Container>
    );
  return (
    <Container>
      <div className={styles.NftContainer}>
        {!isLoading ? (
          <>
            {ownedNFTs?.map((nft) => (
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

export default ProfilePage;
