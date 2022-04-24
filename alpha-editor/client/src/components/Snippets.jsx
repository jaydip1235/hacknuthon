class Language {
    constructor(name, extension, code, sampleCode) {
      this.name = name;
      this.extension = extension;
      this.code = code;
      this.sampleCode = sampleCode;
    }
  }

  let c= new Language(
    "C",
    "c",
    "c",
    `#include<stdio.h>
  
  int main(){
      printf("Welcome to Alpha-editor!");
      return 0;
  }`
  )
  
  let cpp = new Language(
    "C++",
    "cpp",
    "cpp",
    `#include<bits/stdc++.h>
  using namespace std;
  
  int main(){
      cout << "Welcome to Alpha-editor!";
      return 0;
  }`
  );
  
  let python = new Language("Python", "py", "python", `print("Welcome to Alpha-editor!")`);
  
  let java = new Language(
    "Java",
    "java",
    "java",
    `public class Main {
        
      public static void main(String[] args) {
          System.out.println("Welcome to Alpha-editor!"); 
      }
      
  }`
  );
  
  let ruby = new Language("Ruby", "rb", "ruby", `puts "Welcome to Alpha-editor!"`);
  
  let swift = new Language("Swift", "swift", "swift", `print("Welcome to Alpha-editor!") `);
  
  let kotlin = new Language(
    "Kotlin",
    "kt",
    "kotlin",
    `fun main(args: Array<String>) {
      println("Welcome to Alpha-editor!")
  }`
  );
  
const languages = [ python,c,cpp, java, ruby, kotlin, swift];
const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal"
];
const highlightedLangs = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css"
];

export {languages,themes,highlightedLangs};