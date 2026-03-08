import axios from "axios";
import { Note, NoteFormData } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export interface NotesResponse {
	notes: Note[];
	totalPages: number;
}

export async function noteService(query: string, page: number): Promise<NotesResponse> {
	try {
		const q = query.trim();

		const res = await axios.get<NotesResponse>("/notes", {
			params: {
				page, // ✅ завжди
				...(q ? { search: q } : {}), // ✅ search тільки якщо є
			},
		});

		return res.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			throw new Error((err.response?.data as any)?.status_message ?? err.message);
		}
		throw err;
	}
}
export async function createNoteService(form: NoteFormData): Promise<Note> {
	try {
		const res = await axios.post<Note>("/notes", form);
		return res.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			throw new Error((err.response?.data as any)?.status_message ?? err.message);
		}
		throw err;
	}
}

export async function deleteNoteService(id: string): Promise<Note> {
	try {
		const res = await axios.delete<Note>(`/notes/${id}`);
		return res.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			throw new Error((err.response?.data as any)?.status_message ?? err.message);
		}
		throw err;
	}
}

// Отримання деталей однієї нотатки за її ідентифікатором.
export async function fetchNoteById(id: string): Promise<Note> {
	try {
		const res = await axios.get<Note>(`/notes/${id}`);
		return res.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			throw new Error((err.response?.data as any)?.status_message ?? err.message);
		}
		throw err;
	}
}

export async function fetchNoteByTag(tag?: string): Promise<NotesResponse> {
	try {
		const res = await axios.get<NotesResponse>(`/notes`, {
			params: {
				...(tag ? { tag } : {}),
			},
		});
		return res.data;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			throw new Error((err.response?.data as any)?.status_message ?? err.message);
		}
		throw err;
	}
}
