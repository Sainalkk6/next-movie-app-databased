import { useRouter } from "next/router"

export default function SearchPage(){
    const router = useRouter()
    const {search} = router.query
}
