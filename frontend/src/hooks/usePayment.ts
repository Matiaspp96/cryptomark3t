import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import EscrowABI from "@/assets/abi/Escrow.json";
import { utils } from "ethers";

const usePayment = (escrowAddress: `0x${string}`, accountAddress: string | `0x${string}` | undefined, deliveryAmount: any = utils.parseEther('10')) => {
    const { config: configEscrow } = usePrepareContractWrite({
        address: escrowAddress as `0x${string}`,
        abi: EscrowABI.abi,
        functionName: 'pay',
        args: [accountAddress, deliveryAmount],
    });

    const {
        data: dataPay,
        isSuccess: isSuccessPay,
        error: errorPay,
        writeAsync: writePay,
    } = useContractWrite(configEscrow);

    const { isLoading: loadingPay, status: statusPay } =
        useWaitForTransaction({
            hash: dataPay?.hash,
        });

    return {
        configEscrow,
        dataPay,
        loadingPay,
        isSuccessPay,
        errorPay,
        statusPay,
        writePay,
    }
}

export default usePayment;