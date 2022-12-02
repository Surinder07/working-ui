import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Account = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/404')
    }, [])

    return (<></>)
}

export default Account;