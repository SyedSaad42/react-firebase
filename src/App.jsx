
import { useEffect, useState } from 'react';
import './App.css'
import { Auth } from "./components/auth"; // here we adding the auth component to the app
import{ db , auth , storage } from "./config/firebase-config.js" // importing the db that was imported in the firebase-config
import { getDocs, collection,addDoc,deleteDoc,doc,updateDoc} from "firebase/firestore"; /// we are importing directly from the firebase.
import { ref , uploadBytes } from "firebase/storage";
function App() {
  // we are to extracting the data from the database
  // movie list is the array that stores the movie lsit ans set movieList is a method that updates the movie list.
 const [movieList, setMovieList] = useState("");

 // new movies states
 const [newMovieTitle, setNewMovieTitle] = useState("");
 const [newReleaseDate, setNewReleaseDate] = useState(0);
 const [isNewMovieOscar, setNewMovieOscar] = useState(false);



 // update title state
const [updateTitle,setUpdatedTitle] = useState("");

// file upload state
const [fileUpload, setFileUpload] = useState(null);




  const movieCollectionRef = collection(db,"movies"); // this variable stores the table also called collection .. 
  //and in the argument first we inform which database we the table from and then we inform the tbale name

    const onSubmitMovie = async ()=>{
try{

 await addDoc(movieCollectionRef, {title: newMovieTitle, releaseDate: newReleaseDate, receiveAnOscar:isNewMovieOscar , userID: auth?.currentUser?.uid })
 getMovieList();
}catch(err){
  console.error(err);
}
    }
    const getMovieList = async()=>{
      try{
      const data = await getDocs(movieCollectionRef); // as this has await keyword that menas method will run first ..
      //and in the method all it use is the getDoc method from the firebase that will use the collection name to get the id of the table also known as document
    /// so now data has the table id 
       const filteredData = data.docs.map((doc)=> ({...doc.data(), id: doc.id,}
            /// here we are iterating  the elements from the table id store in data variablea and then we are storing it inside the filted data variable .
       )
      )
      setMovieList(filteredData); // and then we are update the movielist array using hte setMovieList funciton by taking in the argument of the filtered data that was extracted from the table id 
        }catch (err){ // if the await funciton fails then throw eerror
          console.error(err)
        }
        };
  
const deleteMovie = async(id) =>{

  try{

    const movieDoc = doc(db,"movies",id)
    await deleteDoc(movieDoc );
  }catch(error){
  console.error(err)
  }
};


  
const UpdateMovieTitle = async(id) =>{

  try{

    const movieDoc = doc(db,"movies",id)
    await updateDoc(movieDoc,{title: updateTitle});
  }catch(error){
  console.error(err)
  }
};


const uploadFile =  async () => {
  if(!fileUpload) return;
  const filesFolderRef =  ref(storage,`projectFile/${fileUpload.name}`);
  try{
  await uploadBytes(filesFolderRef,fileUpload);
  }catch(err){
    console.error(err);
  }
}


useEffect(()=>{
 
      getMovieList(); // invoke this method insid the useEffect hook
},[]);

  return ( // this will be rendered to the web pge
    <>
    <div className="App">
   <Auth/>  
  
<div>
  <input placeholder="Movie title..." onChange={(e) => setNewMovieTitle(e.target.value)}/>
  <input placeholder="Release Date..." type="number" onChange={(e) => setNewReleaseDate(Number(e.target.value))}/>
  <input type='checkbox' checked={isNewMovieOscar} onChange={(e)  => setNewMovieOscar(e.target.checked)}/>

 


  <label> Received an Oscar</label>
  <button onClick={onSubmitMovie}>Submit movie</button>
</div>

  <div> 
    {movieList.map((movie) =>(  
      <div> 
        <h1 style={{color: movie.receiveAnOscar ?"green":"red"}}> 
          {movie.title}</h1>
        <p> Date: {movie.releaseDate}</p>
        <button onClick={()=> deleteMovie(movie.id)}>Delete Movie</button>
       <input type="text" onChange ={(e)=>{
        setUpdatedTitle(e.target.value)
       }} />
       <button onClick ={()=> UpdateMovieTitle(movie.id)
       }>{" "} Update</button>
       </div>
    ))}
       </div>
       <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick ={uploadFile}>Upload File
        </button>
       </div>
    </div>
    </>
  )
} //

export default App
