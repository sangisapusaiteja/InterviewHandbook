"use client";

import { motion } from "framer-motion";
import { IntroductionVisualization } from "./visualizations/IntroductionVisualization";
import { SyntaxVisualization } from "./visualizations/SyntaxVisualization";
import { VariablesVisualization } from "./visualizations/VariablesVisualization";
import { DataTypesVisualization } from "./visualizations/DataTypesVisualization";
import { OperatorsVisualization } from "./visualizations/OperatorsVisualization";
import { TypeConversionVisualization } from "./visualizations/TypeConversionVisualization";
import { CommentsVisualization } from "./visualizations/CommentsVisualization";
import { InputOutputVisualization } from "./visualizations/InputOutputVisualization";
import { StatementsVisualization } from "./visualizations/StatementsVisualization";
import { StrictModeVisualization } from "./visualizations/StrictModeVisualization";
import { IfElseVisualization } from "./visualizations/IfElseVisualization";
import { SwitchVisualization } from "./visualizations/SwitchVisualization";
import { TernaryVisualization } from "./visualizations/TernaryVisualization";
import { ForLoopVisualization } from "./visualizations/ForLoopVisualization";
import { WhileLoopVisualization } from "./visualizations/WhileLoopVisualization";
import { DoWhileVisualization } from "./visualizations/DoWhileVisualization";
import { BreakContinueVisualization } from "./visualizations/BreakContinueVisualization";
import { NestedLoopsVisualization } from "./visualizations/NestedLoopsVisualization";
import { FunctionDeclarationVisualization } from "./visualizations/FunctionDeclarationVisualization";
import { FunctionExpressionsVisualization } from "./visualizations/FunctionExpressionsVisualization";
import { ArrowFunctionsVisualization } from "./visualizations/ArrowFunctionsVisualization";
import { ParametersArgumentsVisualization } from "./visualizations/ParametersArgumentsVisualization";
import { ReturnStatementVisualization } from "./visualizations/ReturnStatementVisualization";
import { DefaultParametersVisualization } from "./visualizations/DefaultParametersVisualization";
import { RestParametersVisualization } from "./visualizations/RestParametersVisualization";
import { CallbackFunctionsVisualization } from "./visualizations/CallbackFunctionsVisualization";
import { HigherOrderFunctionsVisualization } from "./visualizations/HigherOrderFunctionsVisualization";
import { JavaScriptArraysVisualization } from "./visualizations/JavaScriptArraysVisualization";
import { ArrayMethodsVisualization } from "./visualizations/ArrayMethodsVisualization";
import { ArrayIterationVisualization } from "./visualizations/ArrayIterationVisualization";
import { SpreadOperatorVisualization } from "./visualizations/SpreadOperatorVisualization";
import { JavaScriptObjectsVisualization } from "./visualizations/JavaScriptObjectsVisualization";
import { ObjectMethodsVisualization } from "./visualizations/ObjectMethodsVisualization";
import { ObjectDestructuringVisualization } from "./visualizations/ObjectDestructuringVisualization";
import { JSONBasicsVisualization } from "./visualizations/JSONBasicsVisualization";
import { ShallowDeepCopyVisualization } from "./visualizations/ShallowDeepCopyVisualization";
import { WhatIsDOMVisualization } from "./visualizations/WhatIsDOMVisualization";
import { SelectingElementsVisualization } from "./visualizations/SelectingElementsVisualization";
import { ModifyingHTMLVisualization } from "./visualizations/ModifyingHTMLVisualization";
import { ModifyingCSSVisualization } from "./visualizations/ModifyingCSSVisualization";
import { CreatingRemovingVisualization } from "./visualizations/CreatingRemovingVisualization";
import { DOMTraversalVisualization } from "./visualizations/DOMTraversalVisualization";
import { EventListenersVisualization } from "./visualizations/EventListenersVisualization";
import { EventPropagationVisualization } from "./visualizations/EventPropagationVisualization";
import { EventDelegationVisualization } from "./visualizations/EventDelegationVisualization";
import { SyncAsyncVisualization } from "./visualizations/SyncAsyncVisualization";
import { SetTimeoutIntervalVisualization } from "./visualizations/SetTimeoutIntervalVisualization";
import { CallbacksVisualization } from "./visualizations/CallbacksVisualization";
import { CallbackHellVisualization } from "./visualizations/CallbackHellVisualization";
import { PromisesVisualization } from "./visualizations/PromisesVisualization";
import { PromiseChainingVisualization } from "./visualizations/PromiseChainingVisualization";
import { AsyncAwaitVisualization } from "./visualizations/AsyncAwaitVisualization";
import { ErrorHandlingVisualization } from "./visualizations/ErrorHandlingVisualization";
import { FetchAPIVisualization } from "./visualizations/FetchAPIVisualization";
import { TemplateLiteralsVisualization } from "./visualizations/TemplateLiteralsVisualization";
import { DestructuringVisualization } from "./visualizations/DestructuringVisualization";
import { ES6DefaultParamsVisualization } from "./visualizations/ES6DefaultParamsVisualization";
import { ModulesVisualization } from "./visualizations/ModulesVisualization";
import { OptionalChainingVisualization } from "./visualizations/OptionalChainingVisualization";
import { NullishCoalescingVisualization } from "./visualizations/NullishCoalescingVisualization";
import { SpreadRestVisualization } from "./visualizations/SpreadRestVisualization";
import { ShortCircuitingVisualization } from "./visualizations/ShortCircuitingVisualization";
import { ExecutionContextVisualization } from "./visualizations/ExecutionContextVisualization";
import { CallStackVisualization } from "./visualizations/CallStackVisualization";
import { HoistingVisualization } from "./visualizations/HoistingVisualization";
import { ScopeVisualization } from "./visualizations/ScopeVisualization";
import { ClosuresVisualization } from "./visualizations/ClosuresVisualization";
import { ThisKeywordVisualization } from "./visualizations/ThisKeywordVisualization";
import { PrototypesVisualization } from "./visualizations/PrototypesVisualization";
import { PrototypeChainVisualization } from "./visualizations/PrototypeChainVisualization";
import { JavaScriptClassesVisualization } from "./visualizations/JavaScriptClassesVisualization";
import { GarbageCollectionVisualization } from "./visualizations/GarbageCollectionVisualization";
import { LocalStorageVisualization } from "./visualizations/LocalStorageVisualization";
import { SessionStorageVisualization } from "./visualizations/SessionStorageVisualization";
import { GeolocationVisualization } from "./visualizations/GeolocationVisualization";
import { DragAndDropVisualization } from "./visualizations/DragAndDropVisualization";
import { ClipboardVisualization } from "./visualizations/ClipboardVisualization";
import { HistoryAPIVisualization } from "./visualizations/HistoryAPIVisualization";
import { WebWorkersVisualization } from "./visualizations/WebWorkersVisualization";
import { IntersectionObserverVisualization } from "./visualizations/IntersectionObserverVisualization";
import { Card, CardContent } from "@/components/ui/card";

interface JavaScriptVisualizationSectionProps {
  readonly topicSlug: string;
}

const visualizationMap: Record<string, React.ComponentType> = {
  "introduction-to-javascript": IntroductionVisualization,
  "javascript-syntax": SyntaxVisualization,
  "javascript-variables": VariablesVisualization,
  "javascript-data-types": DataTypesVisualization,
  "javascript-operators": OperatorsVisualization,
  "javascript-type-conversion": TypeConversionVisualization,
  "javascript-comments": CommentsVisualization,
  "javascript-input-output": InputOutputVisualization,
  "javascript-statements": StatementsVisualization,
  "javascript-strict-mode": StrictModeVisualization,
  "if-else-statements": IfElseVisualization,
  "switch-statements": SwitchVisualization,
  "ternary-operator": TernaryVisualization,
  "for-loop": ForLoopVisualization,
  "while-loop": WhileLoopVisualization,
  "do-while-loop": DoWhileVisualization,
  "break-and-continue": BreakContinueVisualization,
  "nested-loops": NestedLoopsVisualization,
  "function-declaration": FunctionDeclarationVisualization,
  "function-expressions": FunctionExpressionsVisualization,
  "arrow-functions": ArrowFunctionsVisualization,
  "parameters-and-arguments": ParametersArgumentsVisualization,
  "return-statement": ReturnStatementVisualization,
  "default-parameters": DefaultParametersVisualization,
  "rest-parameters": RestParametersVisualization,
  "callback-functions": CallbackFunctionsVisualization,
  "higher-order-functions": HigherOrderFunctionsVisualization,
  "javascript-arrays": JavaScriptArraysVisualization,
  "array-methods": ArrayMethodsVisualization,
  "array-iteration-methods": ArrayIterationVisualization,
  "spread-operator": SpreadOperatorVisualization,
  "javascript-objects": JavaScriptObjectsVisualization,
  "object-methods": ObjectMethodsVisualization,
  "object-destructuring": ObjectDestructuringVisualization,
  "json-basics": JSONBasicsVisualization,
  "shallow-vs-deep-copy": ShallowDeepCopyVisualization,
  "what-is-dom": WhatIsDOMVisualization,
  "selecting-elements": SelectingElementsVisualization,
  "modifying-html-content": ModifyingHTMLVisualization,
  "modifying-css-styles": ModifyingCSSVisualization,
  "creating-removing-elements": CreatingRemovingVisualization,
  "dom-traversal": DOMTraversalVisualization,
  "event-listeners": EventListenersVisualization,
  "event-propagation": EventPropagationVisualization,
  "event-delegation": EventDelegationVisualization,
  "sync-vs-async": SyncAsyncVisualization,
  "set-timeout-set-interval": SetTimeoutIntervalVisualization,
  "callbacks": CallbacksVisualization,
  "callback-hell": CallbackHellVisualization,
  "promises": PromisesVisualization,
  "promise-chaining": PromiseChainingVisualization,
  "async-await": AsyncAwaitVisualization,
  "error-handling-try-catch": ErrorHandlingVisualization,
  "fetch-api": FetchAPIVisualization,
  "template-literals": TemplateLiteralsVisualization,
  "destructuring-assignment": DestructuringVisualization,
  "es6-default-parameters": ES6DefaultParamsVisualization,
  "modules-import-export": ModulesVisualization,
  "optional-chaining": OptionalChainingVisualization,
  "nullish-coalescing": NullishCoalescingVisualization,
  "spread-and-rest": SpreadRestVisualization,
  "short-circuiting": ShortCircuitingVisualization,
  "execution-context": ExecutionContextVisualization,
  "call-stack": CallStackVisualization,
  "hoisting": HoistingVisualization,
  "scope-and-lexical-scope": ScopeVisualization,
  "closures": ClosuresVisualization,
  "this-keyword": ThisKeywordVisualization,
  "prototypes": PrototypesVisualization,
  "prototype-chain": PrototypeChainVisualization,
  "javascript-classes": JavaScriptClassesVisualization,
  "garbage-collection": GarbageCollectionVisualization,
  "local-storage": LocalStorageVisualization,
  "session-storage": SessionStorageVisualization,
  "geolocation-api": GeolocationVisualization,
  "drag-and-drop-api": DragAndDropVisualization,
  "clipboard-api": ClipboardVisualization,
  "history-api": HistoryAPIVisualization,
  "web-workers": WebWorkersVisualization,
  "intersection-observer": IntersectionObserverVisualization,
};

export function JavaScriptVisualizationSection({ topicSlug }: JavaScriptVisualizationSectionProps) {
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
