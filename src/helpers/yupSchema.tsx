import * as Yup from "yup";

export const fileInputSchema = Yup.object().shape({
  attachment: Yup.mixed()
    .required("Please upload a file")
    .test("fileType", "Invalid file format", function (value) {
      if (!value) return true; // No file, validation handled by 'required'

      const allowedFileExtension = "txt";

      if (value && value instanceof File) {
        const fileName = value.name || "";
        const fileExtension = fileName.split(".").pop()?.toLowerCase(); // Use optional chaining
        return fileExtension === allowedFileExtension;
      }

      return false;
    }),
});
