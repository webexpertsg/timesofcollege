//import formidable from 'formidable';

// Disable default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  //const form = formidable();

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    // You can now process 'files' and 'fields' as needed
    // For example: save to disk, upload to cloud, etc.

    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "File upload failed" });
  }
};

export default handler;

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const chunks = [];
//     req.on('data', (chunk) => chunks.push(chunk));
//     req.on('end', () => {
//       const buffer = Buffer.concat(chunks);
//       const filePath = path.join(process.cwd(), 'uploads', 'image.png');
//       fs.writeFileSync(filePath, buffer);
//       res.status(200).json({ message: 'File uploaded successfully' });
//     });
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
