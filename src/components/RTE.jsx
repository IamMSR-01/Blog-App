import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg p-4'>
            {label && <label className='inline-block mb-2 text-white text-lg font-medium'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        value={value || ""}
                        apiKey='rsm5h4d5owbitzwazwtqu525gzf5u8teuqxfypn06m0fmwb8' 
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image", "advlist", "autolink", "lists", "link", "charmap",
                                "preview", "searchreplace", "visualblocks", "code",
                                "fullscreen", "insertdatetime", "media", "table",
                                "help", "wordcount",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | " +
                                "alignleft aligncenter alignright alignjustify | " +
                                "bullist numlist outdent indent | removeformat | help",
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; color: black !important; background-color: white; padding: 10px; border-radius: 8px; }",
                        }}
                        onEditorChange={(newValue) => onChange(newValue)}
                    />
                )}
            />
        </div>
    );
}
