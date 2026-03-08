"use client";

import { motion } from "framer-motion";
import { IntroductionVisualization } from "./visualizations/IntroductionVisualization";
import { InstallingVisualization } from "./visualizations/InstallingVisualization";
import { ArchitectureVisualization } from "./visualizations/ArchitectureVisualization";
import { CreatingDatabaseVisualization } from "./visualizations/CreatingDatabaseVisualization";
import { DataTypesVisualization } from "./visualizations/DataTypesVisualization";
import { CreatingTablesVisualization } from "./visualizations/CreatingTablesVisualization";
import { AlteringTablesVisualization } from "./visualizations/AlteringTablesVisualization";
import { DroppingTablesVisualization } from "./visualizations/DroppingTablesVisualization";
import { ConstraintsVisualization } from "./visualizations/ConstraintsVisualization";
import { PrimaryForeignKeyVisualization } from "./visualizations/PrimaryForeignKeyVisualization";
import { SelectStatementVisualization } from "./visualizations/SelectStatementVisualization";
import { WhereClauseVisualization } from "./visualizations/WhereClauseVisualization";
import { OrderByVisualization } from "./visualizations/OrderByVisualization";
import { LimitOffsetVisualization } from "./visualizations/LimitOffsetVisualization";
import { DistinctVisualization } from "./visualizations/DistinctVisualization";
import { AliasesVisualization } from "./visualizations/AliasesVisualization";
import { AndOrNotVisualization } from "./visualizations/AndOrNotVisualization";
import { BetweenVisualization } from "./visualizations/BetweenVisualization";
import { InOperatorVisualization } from "./visualizations/InOperatorVisualization";
import { LikeOperatorVisualization } from "./visualizations/LikeOperatorVisualization";
import { InsertStatementVisualization } from "./visualizations/InsertStatementVisualization";
import { UpdateStatementVisualization } from "./visualizations/UpdateStatementVisualization";
import { DeleteStatementVisualization } from "./visualizations/DeleteStatementVisualization";
import { ReturningClauseVisualization } from "./visualizations/ReturningClauseVisualization";
import { UpsertVisualization } from "./visualizations/UpsertVisualization";
import { BulkInsertsVisualization } from "./visualizations/BulkInsertsVisualization";
import { TransactionsVisualization } from "./visualizations/TransactionsVisualization";
import { CommitRollbackVisualization } from "./visualizations/CommitRollbackVisualization";
import { InnerJoinVisualization } from "./visualizations/InnerJoinVisualization";
import { LeftJoinVisualization } from "./visualizations/LeftJoinVisualization";
import { RightJoinVisualization } from "./visualizations/RightJoinVisualization";
import { FullJoinVisualization } from "./visualizations/FullJoinVisualization";
import { SelfJoinVisualization } from "./visualizations/SelfJoinVisualization";
import { CrossJoinVisualization } from "./visualizations/CrossJoinVisualization";
import { JoinConditionsVisualization } from "./visualizations/JoinConditionsVisualization";
import { MultipleTableJoinsVisualization } from "./visualizations/MultipleTableJoinsVisualization";
import { CountFunctionVisualization } from "./visualizations/CountFunctionVisualization";
import { SumFunctionVisualization } from "./visualizations/SumFunctionVisualization";
import { AvgFunctionVisualization } from "./visualizations/AvgFunctionVisualization";
import { MinMaxVisualization } from "./visualizations/MinMaxVisualization";
import { GroupByVisualization } from "./visualizations/GroupByVisualization";
import { HavingClauseVisualization } from "./visualizations/HavingClauseVisualization";
import { AggregationsWithJoinsVisualization } from "./visualizations/AggregationsWithJoinsVisualization";
import { WindowFunctionsVisualization } from "./visualizations/WindowFunctionsVisualization";
import { SubqueriesVisualization } from "./visualizations/SubqueriesVisualization";
import { CorrelatedSubqueriesVisualization } from "./visualizations/CorrelatedSubqueriesVisualization";
import { ExistsOperatorVisualization } from "./visualizations/ExistsOperatorVisualization";
import { CTEVisualization } from "./visualizations/CTEVisualization";
import { RecursiveCTEVisualization } from "./visualizations/RecursiveCTEVisualization";
import { UnionVisualization } from "./visualizations/UnionVisualization";
import { IntersectVisualization } from "./visualizations/IntersectVisualization";
import { ExceptVisualization } from "./visualizations/ExceptVisualization";
import { WhatIsIndexVisualization } from "./visualizations/WhatIsIndexVisualization";
import { CreatingIndexesVisualization } from "./visualizations/CreatingIndexesVisualization";
import { BTreeIndexVisualization } from "./visualizations/BTreeIndexVisualization";
import { HashIndexVisualization } from "./visualizations/HashIndexVisualization";
import { CompositeIndexVisualization } from "./visualizations/CompositeIndexVisualization";
import { PartialIndexVisualization } from "./visualizations/PartialIndexVisualization";
import { QueryOptimizationVisualization } from "./visualizations/QueryOptimizationVisualization";
import { ExplainAnalyzeVisualization } from "./visualizations/ExplainAnalyzeVisualization";
import { NormalizationVisualization } from "./visualizations/NormalizationVisualization";
import { FirstNormalFormVisualization } from "./visualizations/FirstNormalFormVisualization";
import { SecondNormalFormVisualization } from "./visualizations/SecondNormalFormVisualization";
import { ThirdNormalFormVisualization } from "./visualizations/ThirdNormalFormVisualization";
import { DenormalizationVisualization } from "./visualizations/DenormalizationVisualization";
import { ERDiagramsVisualization } from "./visualizations/ERDiagramsVisualization";
import { RelationshipsVisualization } from "./visualizations/RelationshipsVisualization";
import { SchemaDesignVisualization } from "./visualizations/SchemaDesignVisualization";
import { ViewsVisualization } from "./visualizations/ViewsVisualization";
import { MaterializedViewsVisualization } from "./visualizations/MaterializedViewsVisualization";
import { StoredProceduresVisualization } from "./visualizations/StoredProceduresVisualization";
import { FunctionsVisualization } from "./visualizations/FunctionsVisualization";
import { TriggersVisualization } from "./visualizations/TriggersVisualization";
import { JsonJsonbVisualization } from "./visualizations/JsonJsonbVisualization";
import { FullTextSearchVisualization } from "./visualizations/FullTextSearchVisualization";
import { PartitioningVisualization } from "./visualizations/PartitioningVisualization";
import { Card, CardContent } from "@/components/ui/card";

interface PostgreSQLVisualizationSectionProps {
  readonly topicSlug: string;
}

const visualizationMap: Record<string, React.ComponentType> = {
  "introduction-to-postgresql": IntroductionVisualization,
  "installing-postgresql": InstallingVisualization,
  "postgresql-architecture": ArchitectureVisualization,
  "creating-a-database": CreatingDatabaseVisualization,
  "postgresql-data-types": DataTypesVisualization,
  "creating-tables": CreatingTablesVisualization,
  "altering-tables": AlteringTablesVisualization,
  "dropping-tables": DroppingTablesVisualization,
  "postgresql-constraints": ConstraintsVisualization,
  "primary-key-and-foreign-key": PrimaryForeignKeyVisualization,
  "select-statement": SelectStatementVisualization,
  "where-clause": WhereClauseVisualization,
  "order-by": OrderByVisualization,
  "limit-and-offset": LimitOffsetVisualization,
  "distinct": DistinctVisualization,
  "aliases": AliasesVisualization,
  "and-or-not-operators": AndOrNotVisualization,
  "between-operator": BetweenVisualization,
  "in-operator": InOperatorVisualization,
  "like-operator": LikeOperatorVisualization,
  "insert-statement": InsertStatementVisualization,
  "update-statement": UpdateStatementVisualization,
  "delete-statement": DeleteStatementVisualization,
  "returning-clause": ReturningClauseVisualization,
  "upsert-on-conflict": UpsertVisualization,
  "bulk-inserts": BulkInsertsVisualization,
  "transactions-basics": TransactionsVisualization,
  "commit-and-rollback": CommitRollbackVisualization,
  "inner-join": InnerJoinVisualization,
  "left-join": LeftJoinVisualization,
  "right-join": RightJoinVisualization,
  "full-join": FullJoinVisualization,
  "self-join": SelfJoinVisualization,
  "cross-join": CrossJoinVisualization,
  "join-conditions": JoinConditionsVisualization,
  "multiple-table-joins": MultipleTableJoinsVisualization,
  "count-function": CountFunctionVisualization,
  "sum-function": SumFunctionVisualization,
  "avg-function": AvgFunctionVisualization,
  "min-and-max": MinMaxVisualization,
  "group-by": GroupByVisualization,
  "having-clause": HavingClauseVisualization,
  "aggregations-with-joins": AggregationsWithJoinsVisualization,
  "window-functions-basics": WindowFunctionsVisualization,
  "subqueries": SubqueriesVisualization,
  "correlated-subqueries": CorrelatedSubqueriesVisualization,
  "exists-operator": ExistsOperatorVisualization,
  "common-table-expressions": CTEVisualization,
  "recursive-cte": RecursiveCTEVisualization,
  "union-and-union-all": UnionVisualization,
  "intersect-operator": IntersectVisualization,
  "except-operator": ExceptVisualization,
  "what-is-an-index": WhatIsIndexVisualization,
  "creating-indexes": CreatingIndexesVisualization,
  "btree-index": BTreeIndexVisualization,
  "hash-index": HashIndexVisualization,
  "composite-index": CompositeIndexVisualization,
  "partial-index": PartialIndexVisualization,
  "query-optimization": QueryOptimizationVisualization,
  "explain-analyze": ExplainAnalyzeVisualization,
  "normalization": NormalizationVisualization,
  "first-normal-form": FirstNormalFormVisualization,
  "second-normal-form": SecondNormalFormVisualization,
  "third-normal-form": ThirdNormalFormVisualization,
  "denormalization": DenormalizationVisualization,
  "er-diagrams": ERDiagramsVisualization,
  "database-relationships": RelationshipsVisualization,
  "schema-design-best-practices": SchemaDesignVisualization,
  "views": ViewsVisualization,
  "materialized-views": MaterializedViewsVisualization,
  "stored-procedures": StoredProceduresVisualization,
  "postgresql-functions": FunctionsVisualization,
  "triggers": TriggersVisualization,
  "json-jsonb": JsonJsonbVisualization,
  "full-text-search": FullTextSearchVisualization,
  "partitioning": PartitioningVisualization,
};

export function PostgreSQLVisualizationSection({ topicSlug }: PostgreSQLVisualizationSectionProps) {
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
