import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            if (file) appwriteService.deleteFile(post.featuredImage);

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);
            if (file) {
                data.featuredImage = file.$id;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                if (dbPost) navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <motion.form
            onSubmit={handleSubmit(submit)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap text-white bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20"
        >
            {/* Left Side */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 glassy-input"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 glassy-input"
                    {...register("slug", { required: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            {/* Right Side */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 glassy-input"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full mb-4 rounded-lg overflow-hidden shadow-lg"
                    >
                        <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} />
                    </motion.div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 glassy-input"
                    {...register("status", { required: true })}
                />
                <motion.button
                    type="submit"
                    className="ml-35 relative inline-block px-6 py-2 transition-all duration-300 bg-transparent text-white border cursor-pointer border-white/30 rounded-lg overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                >
                    {post ? "Update" : "Submit"}
                    <span className="absolute inset-0 w-full h-full border-2 border-transparent rounded-lg group-hover:border-white/50"></span>
                    <span className="absolute top-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    <span className="absolute top-0 left-0 h-0 w-[2px] bg-white transition-all duration-300 group-hover:h-full"></span>
                    <span className="absolute bottom-0 right-0 h-0 w-[2px] bg-white transition-all duration-300 group-hover:h-full"></span>
                </motion.button>
            </div>
        </motion.form>
    );
}
