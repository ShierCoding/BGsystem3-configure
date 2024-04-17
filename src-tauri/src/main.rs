#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod invoke_commands;
// mod setup;

// use tauri::Manager;
// use window_vibrancy::apply_blur;

fn main() {
    tauri::Builder::default()
        // .setup(|app| {
        //     let window = app.get_window("main").unwrap();

        //     apply_blur(&window, Some((18, 18, 18, 125)))
        //         .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

        //     Ok(())
        // })
        .invoke_handler(tauri::generate_handler![
            invoke_commands::get_window_id
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
