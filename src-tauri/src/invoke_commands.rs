static mut WINDOW_ID: u8 = 0;

#[tauri::command]
pub fn get_window_id() -> String {
    unsafe {
        WINDOW_ID += 1;
        format!("window_{}", WINDOW_ID)
    }
}