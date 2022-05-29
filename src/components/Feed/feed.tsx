import React, { useEffect, useState } from "react";
import { FeedProps } from "../../types/feedPropType";
import Post from "../Post/post";
import "./feed.css";
import './addpost.css';
import { storage,db, auth } from "../../services/firebase";
import { collection, addDoc, query, where, getDocs,  getDoc, doc } from "firebase/firestore";
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";


const Feed: React.FC<FeedProps> = (props:FeedProps)=>{
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const user = auth.currentUser;

    useEffect(()=>{
        getPosts();
    },
    []);
    async function getPosts() {
        if (user) {
            const docRef = doc(db, "Users", user!.uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            const postCollectionRef = collection(db,"Posts");
            const q = query(postCollectionRef, where("genre", "in", [...data!.interests]));
            getDocs(q).then(
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
        
    }

    const AddPost: React.FC<FeedProps> =(props:FeedProps)=>{
        const [image, setImage] = useState<any>(null);
        const [fileName, setFileName] = useState("");
        const [caption, setCaption] = useState("");
        const [uploadStatus, setUploadStatus] = useState(false);
        const [interest,setInterest]=useState('');

    
        const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
            const fileList = e.target.files;
            if(uploadStatus) return;
            if (!fileList) return;
            setFileName(fileList[0].name+fileList[0].size);
            setImage(fileList[0]);
            setUploadStatus(true);
        };

        const handleSubmit = async() => {
            const imageRef =  ref(storage, fileName);
            if (user) {
                const docRef = doc(db, "Users", user!.uid);
                const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            const uploadPost=uploadBytes(imageRef, image);
            if (interest!="0") {
                uploadPost.then(async () => {
                    setUploadStatus(true);
                    getDownloadURL(imageRef)
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "Posts"), {
                            user: data!.userName,
                            imgUrl: url,
                            caption:caption,
                            genre: interest,
                            like:0,
                            likedby:[],
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
            }else{
                alert("not logged in");
            }
            
            }
            
        
        return(
            <div className="modal-background" >
                <div className="modal" >
                <div className="form-input">
                {uploadStatus && <p className="uploaded">Uploaded</p>}
                {!uploadStatus && <label htmlFor="file-ip-1">Upload Image</label>}
                <input type="file" id="file-ip-1" accept="image/*" onChange={handleImageChange}></input>
                <select className="genre" id="genre" onChange={(e)=>{setInterest(e.target.value)}}>
                    <option value="0" className="">Choose Genre:</option>
                    <option value="Photography">Photography</option>
                    <option value="Fine Art">Fine Art</option>
                    <option value="Stand Up">Stand Up</option>
                    <option value="Music">Music</option>
                    <option value="Dance">Dance</option>
                </select>
                <textarea className="caption"  placeholder="caption" onChange={(e)=>{setCaption(e.target.value)}} />
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




