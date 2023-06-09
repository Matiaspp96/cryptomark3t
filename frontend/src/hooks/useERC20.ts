import TokenABI from "@/assets/abi/Token.json";
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";


const useERC20 = () => {
    const approve = (tokenAddress: `0x${string}`, escrowAddress: string, price: any) => {
        const { config: configToken } = usePrepareContractWrite({
            address: tokenAddress as `0x${string}`,
            abi: TokenABI.abi,
            functionName: 'approve',
            args: [escrowAddress, price]
        });

        const {
            data: dataApprove,
            isSuccess: successApprove,
            error: errorApprove,
            writeAsync: writeApprove,
        } = useContractWrite(configToken);

        const { status: statusApprove } =
            useWaitForTransaction({
                hash: dataApprove?.hash,
            });

        return {
            configToken,
            dataApprove,
            successApprove,
            errorApprove,
            writeApprove,
            statusApprove
        }
    }

    const hasAllowance = (tokenAddress: `0x${string}`, escrowAddress: string, ownerAddress: `0x${string}` | undefined) => {
        const { data: dataAllowance, error: errorAllowance, isLoading: loadingAllowance, isSuccess: successAllowance } = useContractRead({
            address: tokenAddress as `0x${string}`,
            abi: TokenABI.abi,
            functionName: 'allowance',
            args: [ownerAddress, escrowAddress],
        })

        return {
            dataAllowance,
            errorAllowance,
            loadingAllowance,
            successAllowance
        }
    }

    return {
        approve,
        hasAllowance
    }
}

export default useERC20;