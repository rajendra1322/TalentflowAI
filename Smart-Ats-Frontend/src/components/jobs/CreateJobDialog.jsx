import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import api from "@/services/api";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";


export default function CreateJobDialog({ refresh }) {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({ title: "", company: "", location: "", description: "", skills: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

     const handleSubmit = async () => {
    try {
        const payload = { ...form, skills: form.skills.split(",").map((s) => s.trim()) };
        await api.post("/jobs", payload);
        refresh?.();
        setForm({ title: "", company: "", location: "", description: "", skills: "" });
        setOpen(false);
        toast.success("Job created");
        navigate('/jobs');
    } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || 'Failed to create job');
    }
};

    return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-sky-500 hover:bg-sky-600">+ Create Job</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[700px] rounded-3xl">

                <DialogHeader>
                    <DialogTitle>Create New Job</DialogTitle>
                </DialogHeader>

                <div className="grid md:grid-cols-2 gap-4 mt-4">

                    <Input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} />
                    <Input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} />
                    <Input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
                    <Input name="skills" placeholder="Skills (React, Node.js, MongoDB)" value={form.skills} onChange={handleChange} />

                </div>

                <div className="mt-4">
                    <Textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange} />
                </div>

                <div className="flex justify-end mt-4">

                    <Button onClick={handleSubmit} className="bg-sky-500 hover:bg-sky-600">Save Job</Button>

                </div>

            </DialogContent>

        </Dialog>
    );
}