import Navbar from "@/components/Navbar";

export default function HomeLayout({children}:{children:React.ReactNode}){
    return(
        <section>
            <div className="sticky top-0 bg-white dark:bg-black z-50">
            <Navbar/>
            </div>
            
            {children}
        </section>
    )
}