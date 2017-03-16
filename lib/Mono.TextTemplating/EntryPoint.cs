using System;
using System.CodeDom.Compiler;
using System.Linq;
using TinyJson;

namespace Mono.TextTemplating
{
  public class EntryPoint
  {
    private const string HELP_ARG = "help";

    /// <summary>
    /// 
    /// </summary>
    /// <param name="args"></param>
    /// <returns></returns>
    private static int Main(string[] args)
    {
      TemplateResults results = new TemplateResults();
      
      if (args.Length == 0)
      {
        ShowHelp();
        results.wasSuccssful = false;
      }
      else if (args[0] == HELP_ARG)
      {
        ShowHelp();
        results.wasSuccssful = true;
      }
      else if (args.Length < 2)
      {
        ShowHelp();
        results.wasSuccssful = false;
      }
      else
      {
        string input = args.First();
        string output = args.Last();
        results.inputPath = input;
        results.outputPath = output;

        // Create our generator
        TemplateGenerator geneator = new TemplateGenerator();
        // run it
        geneator.ProcessTemplate(input, output);

        if (geneator.Errors.HasErrors)
        {
          foreach(CompilerError error in geneator.Errors)
          {
            results.compileErrors.Add(error);
          }
          results.wasSuccssful = false;
        }
        else
        {
          results.wasSuccssful = true;
        }
      }

      // Write our output
      string outputJson = JSONWriter.ToJson(results);
      // Write it out
      Console.WriteLine(outputJson);

      return results.wasSuccssful ? 0 : 1;
    }


    private static void ShowHelp()
    {
      Console.WriteLine("Syntax: 'TextTransform [<options>] <templateName>'");
      Console.WriteLine("Arguments");
      Console.WriteLine("\ttemplateName: Identifies the name of the template file that you want to transform");
      Console.WriteLine("options");
      Console.WriteLine("\t-out <filename>: \tThe file to which the output of the transform is written.");
      Console.WriteLine("\t-r <assembly>: \tAn assembly used for compiling and running the text template.");
      Console.WriteLine("\t-u <namespace>: \tA namespace that is used for compiling the template.");
      Console.WriteLine("\t-I <includedirectory>: \tA directory that contains the text templates \n" +
                   "\t\tincluded in the specified text template.");

      Console.WriteLine("\t-P <referencepath>: \tA directory to search for assemblies specified within \n" +
                 "\t\tthe text template or for using the -r option. For example, to include assemblies \n" +
                 "\t\t used for the Visual Studio API, use  -P \"%VSSHELLFOLDER%\\Common7\\IDE\\PublicAssemblies\"");

      Console.WriteLine("\t-dp <<processorName>!<className>!<assemblyName|codeBase>: The name, full type \n" +
                 "\t\tname, and assembly of a directive processor that can be used to process custom \n" +
                 "\t\tdirectives within the text template.");

      Console.WriteLine("\t-a [processorName]![directiveName]!<parameterName>!<parameterValue>: Specify a \n" +
                       "\t\tparameter value for a directive processor. If you specify just the parameter \n" +
                 "\t\tname and value, the parameter will be available to all directive processors. \n" +
                 "\t\tIf you specify a directive processor, the parameter is available only to the \n" +
                 "\t\tspecified processor. If you specify a directive name, the parameter is available \n" +
                 "\t\tonly when the specified directive is being processed.");

      Console.WriteLine("\thelp: \tProvides help.");
    }

  }
}

