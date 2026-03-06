"use client";

import { motion } from "framer-motion";
import { IntroductionVisualization } from "./visualizations/IntroductionVisualization";
import { InstallationSetupVisualization } from "./visualizations/InstallationSetupVisualization";
import { SyntaxVisualization } from "./visualizations/SyntaxVisualization";
import { VariablesVisualization } from "./visualizations/VariablesVisualization";
import { DataTypesVisualization } from "./visualizations/DataTypesVisualization";
import { TypeCastingVisualization } from "./visualizations/TypeCastingVisualization";
import { CommentsVisualization } from "./visualizations/CommentsVisualization";
import { InputOutputVisualization } from "./visualizations/InputOutputVisualization";
import { KeywordsVisualization } from "./visualizations/KeywordsVisualization";
import { OperatorsVisualization } from "./visualizations/OperatorsVisualization";
import { IfStatementsVisualization } from "./visualizations/IfStatementsVisualization";
import { IfElseVisualization } from "./visualizations/IfElseVisualization";
import { ElifVisualization } from "./visualizations/ElifVisualization";
import { NestedConditionsVisualization } from "./visualizations/NestedConditionsVisualization";
import { ForLoopVisualization } from "./visualizations/ForLoopVisualization";
import { WhileLoopVisualization } from "./visualizations/WhileLoopVisualization";
import { BreakContinueVisualization } from "./visualizations/BreakContinueVisualization";
import { PassStatementVisualization } from "./visualizations/PassStatementVisualization";
import { FunctionsVisualization } from "./visualizations/FunctionsVisualization";
import { FunctionArgumentsVisualization } from "./visualizations/FunctionArgumentsVisualization";
import { DefaultArgumentsVisualization } from "./visualizations/DefaultArgumentsVisualization";
import { KeywordArgumentsVisualization } from "./visualizations/KeywordArgumentsVisualization";
import { ArgsKwargsVisualization } from "./visualizations/ArgsKwargsVisualization";
import { ReturnValuesVisualization } from "./visualizations/ReturnValuesVisualization";
import { LambdaFunctionsVisualization } from "./visualizations/LambdaFunctionsVisualization";
import { RecursiveFunctionsVisualization } from "./visualizations/RecursiveFunctionsVisualization";
import { HigherOrderFunctionsVisualization } from "./visualizations/HigherOrderFunctionsVisualization";
import { ListsVisualization } from "./visualizations/ListsVisualization";
import { ListMethodsVisualization } from "./visualizations/ListMethodsVisualization";
import { TuplesVisualization } from "./visualizations/TuplesVisualization";
import { SetsVisualization } from "./visualizations/SetsVisualization";
import { SetMethodsVisualization } from "./visualizations/SetMethodsVisualization";
import { DictionariesVisualization } from "./visualizations/DictionariesVisualization";
import { DictionaryMethodsVisualization } from "./visualizations/DictionaryMethodsVisualization";
import { ListComprehensionVisualization } from "./visualizations/ListComprehensionVisualization";
import { DictionaryComprehensionVisualization } from "./visualizations/DictionaryComprehensionVisualization";
import { StringsVisualization } from "./visualizations/StringsVisualization";
import { StringMethodsVisualization } from "./visualizations/StringMethodsVisualization";
import { StringFormattingVisualization } from "./visualizations/StringFormattingVisualization";
import { FStringsVisualization } from "./visualizations/FStringsVisualization";
import { BuiltinFunctionsVisualization } from "./visualizations/BuiltinFunctionsVisualization";
import { EnumerateVisualization } from "./visualizations/EnumerateVisualization";
import { ZipVisualization } from "./visualizations/ZipVisualization";
import { MapFilterReduceVisualization } from "./visualizations/MapFilterReduceVisualization";
import { ClassesObjectsVisualization } from "./visualizations/ClassesObjectsVisualization";
import { ConstructorsVisualization } from "./visualizations/ConstructorsVisualization";
import { InstanceClassVariablesVisualization } from "./visualizations/InstanceClassVariablesVisualization";
import { InstanceMethodsVisualization } from "./visualizations/InstanceMethodsVisualization";
import { InheritanceVisualization } from "./visualizations/InheritanceVisualization";
import { MultipleInheritanceVisualization } from "./visualizations/MultipleInheritanceVisualization";
import { MethodOverridingVisualization } from "./visualizations/MethodOverridingVisualization";
import { EncapsulationVisualization } from "./visualizations/EncapsulationVisualization";
import { PolymorphismVisualization } from "./visualizations/PolymorphismVisualization";
import { MagicMethodsVisualization } from "./visualizations/MagicMethodsVisualization";
import { ExceptionsVisualization } from "./visualizations/ExceptionsVisualization";
import { TryExceptVisualization } from "./visualizations/TryExceptVisualization";
import { FinallyVisualization } from "./visualizations/FinallyVisualization";
import { CustomExceptionsVisualization } from "./visualizations/CustomExceptionsVisualization";
import { FileHandlingVisualization } from "./visualizations/FileHandlingVisualization";
import { ReadingFilesVisualization } from "./visualizations/ReadingFilesVisualization";
import { WritingFilesVisualization } from "./visualizations/WritingFilesVisualization";
import { CsvJsonVisualization } from "./visualizations/CsvJsonVisualization";
import { ModulesVisualization } from "./visualizations/ModulesVisualization";
import { ImportStatementsVisualization } from "./visualizations/ImportStatementsVisualization";
import { PackagesVisualization } from "./visualizations/PackagesVisualization";
import { StandardLibraryVisualization } from "./visualizations/StandardLibraryVisualization";
import { DatetimeModuleVisualization } from "./visualizations/DatetimeModuleVisualization";
import { MathModuleVisualization } from "./visualizations/MathModuleVisualization";
import { RandomModuleVisualization } from "./visualizations/RandomModuleVisualization";
import { OsModuleVisualization } from "./visualizations/OsModuleVisualization";
import { IteratorsVisualization } from "./visualizations/IteratorsVisualization";
import { GeneratorsVisualization } from "./visualizations/GeneratorsVisualization";
import { DecoratorsVisualization } from "./visualizations/DecoratorsVisualization";
import { ContextManagersVisualization } from "./visualizations/ContextManagersVisualization";
import { MultithreadingVisualization } from "./visualizations/MultithreadingVisualization";
import { MultiprocessingVisualization } from "./visualizations/MultiprocessingVisualization";
import { VirtualEnvironmentsVisualization } from "./visualizations/VirtualEnvironmentsVisualization";
import { PerformanceTipsVisualization } from "./visualizations/PerformanceTipsVisualization";
import { Card, CardContent } from "@/components/ui/card";

interface PythonVisualizationSectionProps {
  readonly topicSlug: string;
}

const visualizationMap: Record<string, React.ComponentType> = {
  "introduction-to-python": IntroductionVisualization,
  "python-installation-setup": InstallationSetupVisualization,
  "python-syntax": SyntaxVisualization,
  "python-variables": VariablesVisualization,
  "python-data-types": DataTypesVisualization,
  "python-type-casting": TypeCastingVisualization,
  "python-comments": CommentsVisualization,
  "python-input-output": InputOutputVisualization,
  "python-keywords": KeywordsVisualization,
  "python-operators": OperatorsVisualization,
  // Level 2: Control Flow
  "python-if-statements": IfStatementsVisualization,
  "python-if-else": IfElseVisualization,
  "python-elif": ElifVisualization,
  "python-nested-conditions": NestedConditionsVisualization,
  "python-for-loop": ForLoopVisualization,
  "python-while-loop": WhileLoopVisualization,
  "python-break-continue": BreakContinueVisualization,
  "python-pass-statement": PassStatementVisualization,
  // Level 3: Functions
  "python-functions": FunctionsVisualization,
  "python-function-arguments": FunctionArgumentsVisualization,
  "python-default-arguments": DefaultArgumentsVisualization,
  "python-keyword-arguments": KeywordArgumentsVisualization,
  "python-args-kwargs": ArgsKwargsVisualization,
  "python-return-values": ReturnValuesVisualization,
  "python-lambda-functions": LambdaFunctionsVisualization,
  "python-recursive-functions": RecursiveFunctionsVisualization,
  "python-higher-order-functions": HigherOrderFunctionsVisualization,
  // Level 4: Data Structures
  "python-lists": ListsVisualization,
  "python-list-methods": ListMethodsVisualization,
  "python-tuples": TuplesVisualization,
  "python-sets": SetsVisualization,
  "python-set-methods": SetMethodsVisualization,
  "python-dictionaries": DictionariesVisualization,
  "python-dictionary-methods": DictionaryMethodsVisualization,
  "python-list-comprehension": ListComprehensionVisualization,
  "python-dictionary-comprehension": DictionaryComprehensionVisualization,
  // Level 5: Strings & Built-in Functions
  "python-strings": StringsVisualization,
  "python-string-methods": StringMethodsVisualization,
  "python-string-formatting": StringFormattingVisualization,
  "python-f-strings": FStringsVisualization,
  "python-builtin-functions": BuiltinFunctionsVisualization,
  "python-enumerate": EnumerateVisualization,
  "python-zip": ZipVisualization,
  "python-map-filter-reduce": MapFilterReduceVisualization,
  // Level 6: Object-Oriented Programming
  "python-classes-objects": ClassesObjectsVisualization,
  "python-constructors": ConstructorsVisualization,
  "python-instance-class-variables": InstanceClassVariablesVisualization,
  "python-instance-methods": InstanceMethodsVisualization,
  "python-inheritance": InheritanceVisualization,
  "python-multiple-inheritance": MultipleInheritanceVisualization,
  "python-method-overriding": MethodOverridingVisualization,
  "python-encapsulation": EncapsulationVisualization,
  "python-polymorphism": PolymorphismVisualization,
  "python-magic-methods": MagicMethodsVisualization,
  // Level 7: Error & File Handling
  "python-exceptions": ExceptionsVisualization,
  "python-try-except": TryExceptVisualization,
  "python-finally": FinallyVisualization,
  "python-custom-exceptions": CustomExceptionsVisualization,
  "python-file-handling": FileHandlingVisualization,
  "python-reading-files": ReadingFilesVisualization,
  "python-writing-files": WritingFilesVisualization,
  "python-csv-json": CsvJsonVisualization,
  // Level 8: Modules & Libraries
  "python-modules": ModulesVisualization,
  "python-import-statements": ImportStatementsVisualization,
  "python-packages": PackagesVisualization,
  "python-standard-library": StandardLibraryVisualization,
  "python-datetime-module": DatetimeModuleVisualization,
  "python-math-module": MathModuleVisualization,
  "python-random-module": RandomModuleVisualization,
  "python-os-module": OsModuleVisualization,
  // Level 9: Advanced Python Concepts
  "python-iterators": IteratorsVisualization,
  "python-generators": GeneratorsVisualization,
  "python-decorators": DecoratorsVisualization,
  "python-context-managers": ContextManagersVisualization,
  "python-multithreading": MultithreadingVisualization,
  "python-multiprocessing": MultiprocessingVisualization,
  "python-virtual-environments": VirtualEnvironmentsVisualization,
  "python-performance-tips": PerformanceTipsVisualization,
};

export function PythonVisualizationSection({ topicSlug }: PythonVisualizationSectionProps) {
  const VisualizationComponent = visualizationMap[topicSlug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {VisualizationComponent ? (
        <VisualizationComponent />
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              Visualization coming soon for this topic.
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
