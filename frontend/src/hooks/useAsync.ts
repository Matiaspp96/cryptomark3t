import { useEffect } from 'react';

export const useAsync = (
    asyncFn: () => Promise<any>,
    successFunction: Function,
    returnFunction: Function,
    dependencies: any[] = []
) => {
    useEffect(() => {
        let isActive = true;
        asyncFn().then((result) => {
            if (isActive) successFunction(result.data);
        });
        return () => {
            returnFunction && returnFunction();
            isActive = false;
        };
    }, dependencies);
};