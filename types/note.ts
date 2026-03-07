export interface Note {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	tag: string;
}

type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export type NoteFormData = {
	title: string;
	content: string;
	tag: Tag;
};

