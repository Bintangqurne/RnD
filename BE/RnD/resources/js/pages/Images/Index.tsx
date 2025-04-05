import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

interface Image {
    id: number;
    title: string;
    image_path: string;
}

interface Props {
    images: Image[];
}

export default function Index({ images }: Props) {
    const { data, setData, post, processing, reset } = useForm({
        title: "",
        image: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData("image", e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/images", {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    className="border p-2 w-full"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    required
                />
                <input
                    type="file"
                    className="border p-2 w-full"
                    onChange={handleFileChange}
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={processing}>
                    {processing ? "Uploading..." : "Upload"}
                </button>
            </form>

            <h2 className="text-xl font-bold mt-6">Uploaded Images</h2>
            
        </div>
    );
}
