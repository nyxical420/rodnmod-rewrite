use reqwest::blocking::get;

#[tauri::command]
pub fn internet_get(url: &str) -> Result<String, String> {
    let response = get(url)
        .map_err(|e| e.to_string())?
        .text()
        .map_err(|e| e.to_string())?;

    Ok(response)
}