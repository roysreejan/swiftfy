"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Pencil, Trash2, Plus, Search, Filter, Menu, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const initialData = [
  {
    id: 1,
    name: "AI",
    description: "Artificial Intelligence",
    position: 12,
    status: true,
  },
  {
    id: 2,
    name: "DevOps",
    description: "Development Operations",
    position: 11,
    status: true,
  },
  {
    id: 3,
    name: "Cybersecurity",
    description: "Cyber Security",
    position: 10,
    status: true,
  },
  {
    id: 4,
    name: "Software",
    description: "Software Development",
    position: 1,
    status: true,
  },
  {
    id: 5,
    name: "Case Study",
    description: "Case Studies",
    position: 8,
    status: false,
  },
  {
    id: 6,
    name: "Blog Post",
    description: "Blog Posts",
    position: 7,
    status: false,
  },
  {
    id: 7,
    name: "Branding",
    description: "Branding Strategies",
    position: 9,
    status: false,
  },
  {
    id: 8,
    name: "Product Design",
    description: "Product Design",
    position: 2,
    status: false,
  },
  {
    id: 9,
    name: "App Design",
    description: "Application Design",
    position: 3,
    status: false,
  },
  {
    id: 10,
    name: "SAAS",
    description: "Software as a Service",
    position: 4,
    status: true,
  },
  {
    id: 11,
    name: "Machine Learning",
    description: "Machine Learning",
    position: 5,
    status: true,
  },
  {
    id: 12,
    name: "Web Development",
    description: "Web Development",
    position: 6,
    status: false,
  },
  {
    id: 13,
    name: "Mobile App",
    description: "Mobile Applications",
    position: 13,
    status: true,
  },
  {
    id: 14,
    name: "Cloud Computing",
    description: "Cloud Computing",
    position: 14,
    status: false,
  },
  {
    id: 15,
    name: "Data Science",
    description: "Data Science",
    position: 15,
    status: true,
  },
];

export default function BlogCategoryTable() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleStatus = (id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const deleteItem = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    if (currentPage > Math.ceil((data.length - 1) / itemsPerPage)) {
      setCurrentPage(1);
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const activeCount = data.filter((item) => item.status).length;
  const inactiveCount = data.filter((item) => !item.status).length;

  // Pagination handlers
  const goToPage = (page: number) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  const goToNextPage = () => goToPage(currentPage + 1);
  const goToPreviousPage = () => goToPage(currentPage - 1);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("ellipsis-start");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("ellipsis-end");
      pages.push(totalPages);
    }

    return pages;
  };

  // Mobile card view for small screens
  const MobileCategoryCard = ({ item, index }: { item: any; index: number }) => (
    <Card className="mb-4 bg-white/80 backdrop-blur-sm border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
          </div>
          <Badge className="font-mono text-sm px-2 py-1 bg-blue-100 text-blue-800">
            #{item.position}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center space-x-2">
            <Switch
              checked={item.status}
              onCheckedChange={() => toggleStatus(item.id)}
              className="scale-90"
            />
            <Badge
              className={`px-2 py-1 text-xs ${
                item.status
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-red-100 text-red-800 border-red-200"
              }`}
            >
              {item.status ? "Active" : "Inactive"}
            </Badge>
          </div>
          
          <div className="flex space-x-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 rounded-md border border-blue-200 hover:bg-blue-50"
            >
              <Pencil className="h-3 w-3 text-blue-600" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => deleteItem(item.id)}
              className="h-8 w-8 rounded-md border border-red-200 hover:bg-red-50"
            >
              <Trash2 className="h-3 w-3 text-red-600" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 sm:p-6">
      <div className="flex justify-center">
        <div className="w-full max-w-7xl">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 sm:mb-6">
              <div className="text-center lg:text-left w-full">
                <div className="flex items-center justify-between lg:justify-start lg:block">
                  <div>
                    <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
                      Blog Categories
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-lg">
                      Manage your blog categories and their visibility settings
                    </p>
                  </div>
                  
                  {/* Mobile menu button */}
                  <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="lg:hidden">
                        <Menu className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-lg font-semibold">Menu</h2>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="mr-2 h-4 w-4" /> Add New Category
                          </Button>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-600">Quick Stats</p>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-xs text-gray-600">Total</p>
                                <p className="font-bold text-gray-900">{data.length}</p>
                              </div>
                              <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-xs text-gray-600">Active</p>
                                <p className="font-bold text-green-600">{activeCount}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
              
              <Button className="hidden lg:flex bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 h-auto">
                <Plus className="mr-2 h-5 w-5" /> Add New Category
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      Total Categories
                    </p>
                    <p className="text-xl sm:text-3xl font-bold text-gray-900">
                      {data.length}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-600 rounded-full"></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Active</p>
                    <p className="text-xl sm:text-3xl font-bold text-green-600">
                      {activeCount}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-green-100 rounded-full">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 bg-green-600 rounded-full"></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      Inactive
                    </p>
                    <p className="text-xl sm:text-3xl font-bold text-red-600">
                      {inactiveCount}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-red-100 rounded-full">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 bg-red-600 rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Table Section */}
          <Card className="w-full border-0 shadow-lg rounded-xl sm:rounded-2xl overflow-hidden mx-auto">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">
                Category List
              </CardTitle>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-48 lg:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 text-sm sm:text-base"
                  />
                </div>
                <Button variant="outline" className="border-gray-300 hidden sm:flex">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Mobile Card View */}
              <div className="block sm:hidden p-4">
                {currentData.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-gray-300 mb-2" />
                      <p className="text-base font-medium">No categories found</p>
                      <p className="text-gray-400 text-sm">Try adjusting your search terms</p>
                    </div>
                  </div>
                ) : (
                  currentData.map((item, index) => (
                    <MobileCategoryCard key={item.id} item={item} index={index} />
                  ))
                )}
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100/80 hover:bg-gray-200/80">
                      <TableHead className="w-16 text-center font-semibold text-gray-700 py-3 sm:py-4 text-xs sm:text-sm">
                        #
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700 py-3 sm:py-4 min-w-[120px] sm:min-w-[200px] text-center text-xs sm:text-sm">
                        Category
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700 py-3 sm:py-4 min-w-[150px] sm:min-w-[300px] text-center text-xs sm:text-sm">
                        Description
                      </TableHead>
                      <TableHead className="text-center font-semibold text-gray-700 py-3 sm:py-4 min-w-[80px] sm:min-w-[120px] text-xs sm:text-sm">
                        Position
                      </TableHead>
                      <TableHead className="text-center font-semibold text-gray-700 py-3 sm:py-4 min-w-[100px] sm:min-w-[140px] text-xs sm:text-sm">
                        Status
                      </TableHead>
                      <TableHead className="text-center font-semibold text-gray-700 py-3 sm:py-4 min-w-[120px] sm:min-w-[150px] text-xs sm:text-sm">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {currentData.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-8 text-gray-500"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <Search className="h-8 w-8 text-gray-300 mb-2" />
                            <p className="text-base font-medium">No categories found</p>
                            <p className="text-gray-400 text-sm">Try adjusting your search terms</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentData.map((item, index) => (
                        <TableRow
                          key={item.id}
                          className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors group"
                        >
                          <TableCell className="text-center font-medium text-gray-600 py-3 sm:py-4 text-xs sm:text-sm">
                            {startIndex + index + 1}
                          </TableCell>
                          <TableCell className="py-3 sm:py-4 text-center font-semibold text-gray-900 text-xs sm:text-sm">
                            {item.name}
                          </TableCell>
                          <TableCell className="text-gray-600 py-3 sm:py-4 text-center text-xs sm:text-sm">
                            {item.description}
                          </TableCell>
                          <TableCell className="text-center py-3 sm:py-4">
                            <Badge className="font-mono text-xs px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 text-blue-800">
                              {item.position}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center py-3 sm:py-4">
                            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                              <Switch
                                checked={item.status}
                                onCheckedChange={() => toggleStatus(item.id)}
                                className="scale-90 sm:scale-100"
                              />
                              <Badge
                                className={`px-2 py-1 text-xs sm:px-3 sm:py-1 ${
                                  item.status
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : "bg-red-100 text-red-800 border-red-200"
                                }`}
                              >
                                {item.status ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-center py-3 sm:py-4">
                            <div className="flex justify-center space-x-1 sm:space-x-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 sm:h-9 sm:w-9 rounded-md border border-blue-200 hover:bg-blue-50"
                              >
                                <Pencil className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteItem(item.id)}
                                className="h-7 w-7 sm:h-9 sm:w-9 rounded-md border border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-t bg-gray-50/50">
                  <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-0">
                    Showing {startIndex + 1} to {Math.min(endIndex, totalItems)}{" "}
                    of {totalItems} entries
                  </div>

                  <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                    <div className="flex items-center space-x-2 w-full justify-between sm:justify-start sm:w-auto">
                      <span className="text-xs sm:text-sm text-gray-600">Show:</span>
                      <select
                        value={itemsPerPage}
                        onChange={(e) => {
                          setItemsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="border rounded-md px-2 py-1 text-xs sm:text-sm"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                    </div>

                    <Pagination className="w-full sm:w-auto">
                      <PaginationContent className="flex-wrap">
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={goToPreviousPage}
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50 text-xs sm:text-sm"
                                : "cursor-pointer text-xs sm:text-sm"
                            }
                          />
                        </PaginationItem>

                        {getPageNumbers().map((pageNum, index) => (
                          <PaginationItem key={index}>
                            {typeof pageNum === "string" ? (
                              <PaginationEllipsis className="text-xs sm:text-sm" />
                            ) : (
                              <PaginationLink
                                isActive={currentPage === pageNum}
                                onClick={() => goToPage(pageNum)}
                                className="cursor-pointer text-xs sm:text-sm"
                              >
                                {pageNum}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={goToNextPage}
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50 text-xs sm:text-sm"
                                : "cursor-pointer text-xs sm:text-sm"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Floating Action Button for Mobile */}
          <Button className="fixed bottom-6 right-6 z-50 lg:hidden h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}