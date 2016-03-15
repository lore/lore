# Installing the CLI

Before you can use Lore you will first need to install Node.  If you don't already have it installed, please refer to 
[these instructions](../misc/InstallingNode.md).

The easiest way to get started with Lore is by installing the Command Line Interface (CLI). The CLI will let you create 
a starter project, as well as provide utility functions like file generators and helpers to publish your project to 
the web (if you've ever used Rails or Sails it's similar to their CLIs).

```sh
$ npm install -g lore-cli
```

Once the CLI is installed you will have access to `lore` from the command line.
Run lore to see a list of options:

```sh
$ lore

  Usage: lore [options] [command]

  Commands:
    version                                                      version of the CLI
    new <app_name>                                               generate a new Lore project
    generate:generator <generator_name> [generator_description]  generate a new Lore generator
    generate:model <model_name>                                  generate a new Lore model
    generate:collection <collection_name>                        generate a new Lore collection
    generate:component [options] <component_name>                generate a new Lore component
    generate:reducer <reducer_name>                              generate a new Lore reducer
    generate:surge                                               generate a gulp file for publishing your project to surge.sh
    generate:tutorial <step>                                     generate files for the specified tutorial step


  Options:
    -h, --help     output usage information
    -v, --version  output the version number
```

## Next Steps

Now that the `lore-cli` is installed, let's [create a new project](./Step0b.md).
