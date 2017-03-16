using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mono.TextTemplating
{
  public class TemplateResults
  {
    public bool wasSuccssful;

    public string inputPath;

    public string outputPath;

    public List<string> arguments = new List<string>();

    public List<CompilerError> compileErrors = new List<CompilerError>();
  }
}
