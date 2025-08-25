

export function Navbar(props: {logged: boolean}){
    if(props.logged == true){
        return (
            <div  className="grid grid-cols-2 border-b border-b-blue-800/20">
            <div className="flex m-2 gap-2">
                <img className='w-11 h-11' src="/Group 7.svg" alt="Book Icon" />
                <img className='w-11 h-11' src="/Group 7-1.svg" alt="Book Icon" />
            </div>
            <ul className="flex gap-14 text-2xl mt-3 justify-self-end mr-12">
                <li><a href="/map">Map</a></li>
                <li><a href="/notes"> Notes</a></li>
            </ul>
        </div>
        )
    }else{
         return (
        <div  className="grid grid-cols-2 border-b border-b-blue-800/20">
            <div className="flex m-2 gap-2">
                <img className='w-11 h-11' src="/Group 7.svg" alt="Book Icon" />
                <img className='w-11 h-11' src="/Group 7-1.svg" alt="Book Icon" />
            </div>
            <ul className="flex gap-14 text-2xl mt-3 justify-self-end mr-12">
                <li>About</li>
                <li>Statistics</li>
                <li>Contact</li>
            </ul>
        </div>
    )
    }
   
}