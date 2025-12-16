import fs from "node:fs";
import { homedir } from "os";

export type DesktopEntryType = "Application" | "Link" | "Directory";

/**
 * Desktop entry class
 *
 * Works like a builder
 */
export default class DesktopEntry {
	desktopEntryType: string = "Application";
	name: string | undefined;
	cmd: string;
	comment: string | undefined;
	// This file, filename
	fileName: string;
	// App path
	path: string | undefined;
	iconPath: string | undefined;

	/**
	 *
	 * fileName:
	 * File name without the '.desktop'
	 *
	 * cmd:
	 * Command to run, this is for the 'Exec' field
	 */
	constructor(fileName: string, cmd: string) {
		this.fileName = `${fileName}.desktop`;
		this.cmd = cmd;
	}

	/**
	 * Set comment
	 */
	setComment(comment: string) {
		this.comment = comment;
		return this;
	}

	/**
	 * Set path
	 */
	setPath(path: string) {
		this.path = path;
		return this;
	}

	/**
	 * Set type
	 */
	setType(desktopEntryType: DesktopEntryType) {
		this.desktopEntryType = desktopEntryType;
		return this;
	}

	/**
	 * Set application name
	 */
	setName(name: string) {
		this.name = name;
		return this;
	}

	/**
	 * Set command
	 */
	setCmd(cmd: string) {
		this.cmd = cmd;
		return this;
	}

	/**
	 * Set icon
	 */
	setIconPath(iconPath: string) {
		this.iconPath = iconPath;
		return this;
	}

	/**
	 * Get the complete desktop entry as a string
	 */
	get(): string {
		// Validate the name is set
		if (!this.name) {
			throw new Error("Name is required");
		}

		let data = "";

		data = data.concat("[Desktop Entry]", "\n");

		data = data.concat(`Type=${this.desktopEntryType}`, "\n");
		data = data.concat(`Name=${this.name}`, "\n");
		if (this.comment) {
			data = data.concat(`Comment=${this.comment}`, "\n");
		}
		if (this.path) {
			data = data.concat(`Path=${this.path}`, "\n");
		}
		if (this.cmd) {
			data = data.concat(`Exec=${this.cmd}`, "\n");
		}
		if (this.iconPath) {
			data = data.concat(`Icon=${this.iconPath}`, "\n");
		}

		return data;
	}

	/**
	 * Save at
	 *
	 * Unify fields and save as a .desktop file at a given path
	 */
	saveAt(folderPath: string) {
		// Case of failing create the file why not
		fs.writeFileSync(`${folderPath}/${this.fileName}`, this.get());
		return this;
	}

	/**
	 * Save as application
	 */
	saveAsApplication() {
		const userFolder = `${homedir()}/.local/share/applications`;
		fs.writeFileSync(`${userFolder}/${this.fileName}`, this.get());
		return this;
	}

	/**
	 * Save at startup folder
	 *
	 * Save file at the startup folder
	 *
	 * Currently only works on linux
	 */
	saveAtStartup() {
		const userFolder = `${homedir()}/.config/autostart`;
		fs.writeFileSync(`${userFolder}/${this.fileName}`, this.get());
		return this;
	}
}
