"use server";

import { deleteAccount } from "../services/accountDelete";

export default async function deleteAccountAction() {
	return await deleteAccount();
}
