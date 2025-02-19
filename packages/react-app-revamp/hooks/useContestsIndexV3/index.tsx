import { getAccount } from "@wagmi/core";

export interface ContestValues {
  datetimeOpeningSubmissions: Date;
  datetimeOpeningVoting: Date;
  datetimeClosingVoting: Date;
  title: string;
  type: string;
  summary: string;
  prompt: string;
  contractAddress: string;
  networkName: string;
  votingMerkleRoot: string;
  submissionMerkleRoot: string;
  authorAddress?: string;
  featured?: boolean;
}

export function useContestsIndexV3() {
  async function indexContestV3(values: ContestValues) {
    try {
      const { address } = getAccount();
      const config = await import("@config/supabase");
      const supabase = config.supabase;
      const { error, data } = await supabase.from("contests_v3").insert([
        {
          created_at: new Date().toISOString(),
          start_at: values.datetimeOpeningSubmissions.toISOString(),
          vote_start_at: values.datetimeOpeningVoting.toISOString(),
          end_at: values.datetimeClosingVoting.toISOString(),
          title: values.title,
          type: values.type,
          summary: values.summary,
          prompt: values.prompt,
          address: values.contractAddress,
          votingMerkleRoot: values.votingMerkleRoot,
          submissionMerkleRoot: values.submissionMerkleRoot,
          author_address: values?.authorAddress ?? address,
          network_name: values.networkName,
          featured: values.featured ?? false,
        },
      ]);
      if (error) {
        throw new Error(error.message);
      }
    } catch (e) {
      throw e;
    }
  }

  return {
    indexContestV3,
  };
}

export default useContestsIndexV3;
