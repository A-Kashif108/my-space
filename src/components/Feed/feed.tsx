import React, { useEffect, useState } from "react";
import { FeedProps } from "../../types/feedPropType";
import Post from "../Post/post";
import "./feed.css";
import './addpost.css';
import { storage,db } from "../../services/firebase";
import { collection, addDoc, query, where, getDocs, onSnapshot, DocumentData } from "firebase/firestore";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";


const Feed: React.FC<FeedProps> = (props:FeedProps)=>{
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<any[]>([]);
    
    useEffect(()=>{
        getPosts();
    },
    []);
    function getPosts() {
        const postCollectionRef = collection(db,"Posts");
        getDocs(postCollectionRef).then(
            response=>{
                const psts = response.docs.map(doc=>({
                    ...doc.data(),
                    id:doc.id,
                }));
                setData(psts);
            }
        ).catch(error=>{
            console.log(error.message);
        });
    }

    const AddPost: React.FC<FeedProps> =(props:FeedProps)=>{
        const [image, setImage] = useState<any>(null);
        const [fileName, setFileName] = useState("");
        const [uploadStatus, setUploadStatus] = useState(false);
        const [interest,setInterest]=useState('');

    
        const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
            const fileList = e.target.files;
            if(uploadStatus) return;
            if (!fileList) return;
            setFileName(fileList[0].name+fileList[0].size);
            setImage(fileList[0]);
        };

        const handleSubmit = () => {
            const imageRef =  ref(storage, fileName);
            const uploadPost=uploadBytes(imageRef, image);
            uploadPost.then(async () => {
                setUploadStatus(true);
                getDownloadURL(imageRef)
                .then(async (url) => {
                    const docRef = await addDoc(collection(db, "Posts"), {
                        user: "kash",
                        imgUrl: url,
                        genre: interest,
                        like:0,
                        dislike:0,
                    });
                })
                .catch((error) => {
                console.log(error.message, "error getting the image url");
                });
                setImage(null);
                setUploadStatus(false);
                setShowModal(false);
                setInterest('');
                
            })
            .catch((error) => {
                console.log(error.message);
            });
        };
        
        return(
            <div className="modal-background" >
                <div className="modal" >
                <div className="form-input">
                {uploadStatus && <p className="uploaded">Uploaded</p>}
                {!uploadStatus && <label htmlFor="file-ip-1">Upload Image</label>}
                <input type="file" id="file-ip-1" accept="image/*" onChange={handleImageChange}></input>
                <select className="genre" id="genre" onChange={(e)=>{setInterest(e.target.value)}}>
                    <option value="0" className="">Choose Genre:</option>
                    <option value="Movies">Movies</option>
                    <option value="Cars">Cars</option>
                    <option value="Animals">Animals</option>
                    <option value="Memes">Memes</option>
                    <option value="Art">Art</option>
                    <option value="Dance">Dance</option>
                    <option value="Sports">Sports</option>
                </select>
                <button onClick={handleSubmit}>Post</button>
                </div>
                </div>
            </div>
        );
    }
    
    return(
        <div className="page">
            <div className="feed">
                <>
                {data.map((doc)=>{return<Post user={doc.user} like={doc.like} dislike={doc.dislike} id={doc.id} imageurl={doc.imgUrl} />})}
                </>
            </div>
            <button className="AddPost" onClick={()=>{setShowModal(true)}}>Add Post</button>
            {showModal && <AddPost data={""} />}
        </div>
    );
}

export default Feed;




