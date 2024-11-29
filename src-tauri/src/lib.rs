mod internet;
mod filesystem;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        // internet
        internet::commands::internet_get,

        // filesystem


    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}