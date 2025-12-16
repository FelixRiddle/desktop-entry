# Desktop entry

Desktop entry abstraction.

# Example usage

```ts
import fs from "node:fs";
import { homedir } from "os";
import { DesktopEntry, DesktopEntryType } from "@perseverancia/desktop-entry"; // Replace with your file path

// Example usage: Creating a desktop entry for a terminal command
try {
	const terminalEntry = new DesktopEntry("my-terminal", "gnome-terminal")
		.setName("My Terminal")
		.setComment("Opens a custom terminal window")
		.setIconPath("/usr/share/icons/gnome/32x32/apps/gnome-terminal.png")
		.saveAsApplication();

	console.log(
		`Desktop entry "${terminalEntry.fileName}" created in ~/.local/share/applications`
	);

	// Example usage: Creating a desktop entry for a specific directory
	const directoryEntry = new DesktopEntry(
		"my-documents",
		"xdg-open /home/user/Documents"
	)
		.setName("My Documents")
		.setType("Directory" as DesktopEntryType)
		.setPath("/home/user/Documents")
		.setIconPath("/usr/share/icons/gnome/32x32/places/folder-documents.png")
		.saveAsApplication();

	console.log(
		`Desktop entry "${directoryEntry.fileName}" created in ~/.local/share/applications`
	);

	// Example usage: Creating a desktop entry to launch an application with a specific working directory and saving it to a custom location.
	const customLocationEntry = new DesktopEntry("my-app", "my-app-executable")
		.setName("My Application")
		.setPath("/path/to/my/app/directory")
		.setIconPath("/path/to/my/app/icon.png")
		.saveAt("/tmp");

	console.log(
		`Desktop entry "${customLocationEntry.fileName}" created in /tmp`
	);

	// Example usage: Creating a desktop entry for a startup application.
	const startupEntry = new DesktopEntry(
		"my-startup-app",
		"startup-app-executable"
	)
		.setName("My Startup App")
		.saveAtStartup();

	console.log(
		`Desktop entry "${startupEntry.fileName}" created in ~/.config/autostart`
	);
} catch (error) {
	console.error("Error creating desktop entry:", error);
}
```
