import { Editor } from "@tinymce/tinymce-react";
import { Field } from "formik";

type Props = {
  control: string;
  name: string;
  value?: string;
};

const EditorText = ({ control, name, value, ...props }: Props) => {
  switch (control) {
    case "tiny-mce":
      return (
        <>
          <Field id={name} name={name} {...props}>
            {({ form, field }: any) => {
              const { setFieldValue } = form;

              return (
                <>
                  <Editor
                    value={field.value}
                    initialValue={value}
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: "image",
                      toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onEditorChange={(content, editor) => {
                      setFieldValue(name, content);
                    }}
                  />
                </>
              );
            }}
          </Field>
        </>
      );
    default:
      return null;
  }
};

export default EditorText;
