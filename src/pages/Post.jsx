import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 bg-gray-900 min-h-screen flex items-center justify-center">
            <Container>
                <div className="w-full flex flex-col items-center justify-center mb-4 relative border border-gray-700 bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-2xl">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-[350px] max-w-2xl object-cover transition-transform duration-300 hover:scale-105"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex space-x-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500 hover:bg-green-600" className="shadow-md hover:shadow-lg transition-all">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-500 hover:bg-red-600" onClick={deletePost} className="shadow-md hover:shadow-lg transition-all">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 text-center">
                    <h1 className="text-3xl font-bold text-blue-400 animate-pulse">{post.title}</h1>
                </div>
                <div className="browser-css text-white text-lg leading-relaxed bg-gray-800/50 p-6 rounded-xl shadow-lg">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
