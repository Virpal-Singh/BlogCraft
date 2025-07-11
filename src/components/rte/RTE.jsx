import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller, useForm} from 'react-hook-form'




export default function RTE({
    name,
    label,
    control,
    defaultValue = '',
}

) {
  return (
    <div className='w-full '>
        {label && <label className=' text-xl font-semibold text-white flex justify-center mb-2 '>{label}</label>}
        <Controller
            name={name || 'content'}
            control={control}
            defaultValue={defaultValue}
            render={({field: {onChange,value}})=>(
                <Editor
                    apiKey='qw70obsmdrydaizqsyq0gujg40gmdc5j8f0r16dv8twpt7ze'
                    init={
                        {
                            branding: false,
                            height: 500,
                            menubar: true,
                            plugins: 'advlist autolink lists link image charmap  preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',

                            toolbar: 'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

                        }
                    }
                    value={value}
                    onEditorChange={onChange}
            />
            )}
        />
    </div>
  )
}






