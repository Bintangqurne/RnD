import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function Form({ success }) {
    const { data, setData, post, processing } = useForm({
        subject: '',
        content: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('email.send'));
    };

    return (
        <div className="container mx-auto p-4">
            <Head title="Blast Email" />
            <h1 className="text-2xl font-bold mb-4">Blast Email</h1>
            
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Subject</label>
                    <input
                        type="text"
                        value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Content</label>
                    <textarea
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        rows={5}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {processing ? 'Mengirim...' : 'Blast Email'}
                </button>
            </form>
        </div>
    );
}