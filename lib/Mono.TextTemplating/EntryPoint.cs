using System;
using System.CodeDom.Compiler;
using System.Linq;

namespace Mono.TextTemplating
{
  public class EntryPoint
  {
    private const string HELP_ARG = "help";

    private static int Main(string[] args)
    {
      int returnCode = 0;

      if (args.Length == 0)
      {
        ShowHelp();
        returnCode = 1;
      }
      else if (args[0] == HELP_ARG)
      {
        ShowHelp();
      }
      else if (args.Length < 2)
      {
        Console.WriteLine("Error! You must have at least two arguments");
        ShowHelp();
        returnCode = 2;
      }
      else
      {
        string input = args.First();
        string output = args.Last();

        // Create our generator
        TemplateGenerator geneator = new TemplateGenerator();
        // run it
        Console.WriteLine("Transforming " + input + " to " + output);
        geneator.ProcessTemplate(input, output);

        if (geneator.Errors.HasErrors)
        {
          foreach(CompilerError error in geneator.Errors)
          {
            Console.Error.WriteLine(error);
          }
          returnCode = 5;
        }
      }
      return returnCode;
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

