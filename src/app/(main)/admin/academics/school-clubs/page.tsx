
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  PlusSquare,
  ListChecks,
  CalendarDays,
  Plus,
  Copy,
  FileText,
  FileSpreadsheet,
  Printer,
  Search as SearchIcon,
  ArrowUpDown,
  Edit3,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

interface Club {
  id: string;
  clubName: string;
  description: string;
  date: string;
}

const initialClubs: Club[] = [
  { id: "1", clubName: "Jet club", description: "This is for those who love science.", date: "2019-08-25" },
  { id: "2", clubName: "Debate Society", description: "Sharpen your arguments and public speaking.", date: "2020-01-15" },
  { id: "3", clubName: "Art & Craft Circle", description: "Explore your creativity with various mediums.", date: "2021-05-10" },
  { id: "4", clubName: "Coding Ninjas", description: "Learn to code and build cool projects.", date: "2022-09-01" },
  { id: "5", clubName: "Literary Guild", description: "For book lovers and aspiring writers.", date: "2023-03-20" },
];

const clubSchema = z.object({
  clubName: z.string().min(1, "Club name is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required").regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

type ClubFormValues = z.infer<typeof clubSchema>;

const ITEMS_PER_PAGE = 3;

export default function SchoolClubsPage() {
  const [currentDate, setCurrentDate] = useState("");
  const [clubs, setClubs] = useState<Club[]>(initialClubs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm<ClubFormValues>({
    resolver: zodResolver(clubSchema),
    defaultValues: {
      clubName: "",
      description: "",
      date: "",
    }
  });

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '));
  }, []);

  const handleAddClub = () => {
    reset({ clubName: "", description: "", date: new Date().toISOString().split('T')[0] });
    setEditingClub(null);
    setIsModalOpen(true);
  };

  const handleEditClub = (club: Club) => {
    setEditingClub(club);
    setValue("clubName", club.clubName);
    setValue("description", club.description);
    setValue("date", club.date);
    setIsModalOpen(true);
  };

  const onSubmit = (data: ClubFormValues) => {
    if (editingClub) {
      setClubs(clubs.map(c => c.id === editingClub.id ? { ...editingClub, ...data } : c));
      toast({ title: "Club Updated", description: `"${data.clubName}" has been updated.` });
    } else {
      const newClub: Club = { id: String(Date.now()), ...data };
      setClubs(prevClubs => [newClub, ...prevClubs]); // Add to the beginning for visibility
      toast({ title: "Club Added", description: `"${data.clubName}" has been added.` });
    }
    setIsModalOpen(false);
    reset();
  };

  const handleDeleteClub = (clubId: string) => {
    setClubs(clubs.filter(c => c.id !== clubId));
    toast({ title: "Club Deleted", description: "The club has been removed.", variant: "destructive" });
  };
  
  const filteredClubs = useMemo(() => {
    return clubs.filter(club =>
      club.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clubs, searchTerm]);

  const totalPages = Math.ceil(filteredClubs.length / ITEMS_PER_PAGE);
  const paginatedClubs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredClubs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredClubs, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleGenericAction = (actionName: string) => {
    toast({
      title: `${actionName} Clicked`,
      description: `The ${actionName.toLowerCase()} action was triggered (prototype).`,
    });
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Club</h1>
        <div className="text-sm text-muted-foreground">
          Weblabs | ©. All Right Reserved / {currentDate}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingClub ? "Edit Club" : "Add New Club"}</DialogTitle>
            <DialogDescription>
              {editingClub ? "Update the details of the club." : "Fill in the details to add a new club."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div>
              <label htmlFor="clubNameModal" className="block text-sm font-medium text-foreground mb-1">Club Name</label>
              <Input id="clubNameModal" {...register("clubName")} placeholder="Enter club name" />
              {errors.clubName && <p className="text-sm text-red-500 mt-1">{errors.clubName.message}</p>}
            </div>
            <div>
              <label htmlFor="descriptionModal" className="block text-sm font-medium text-foreground mb-1">Description</label>
              <Textarea id="descriptionModal" {...register("description")} placeholder="Enter club description" className="min-h-[80px]" />
              {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
            </div>
            <div>
              <label htmlFor="dateModal" className="block text-sm font-medium text-foreground mb-1">Date (YYYY-MM-DD)</label>
              <div className="relative">
                <Input id="dateModal" type="date" {...register("date")} />
                <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              </div>
              {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="mr-2 h-4 w-4" /> {editingClub ? "Save Changes" : "Add Club"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>


      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Add Club Form (Trigger for Modal) */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg font-medium flex items-center">
                <PlusSquare className="mr-2 h-5 w-5" />
                ADD CLUB
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-sm text-muted-foreground">Click the button below to add a new school club to the list.</p>
               <Button onClick={handleAddClub} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="mr-2 h-4 w-4" /> Add New Club
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* List Club Table */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="bg-muted/30 py-3 px-4 border-b">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ListChecks className="h-5 w-5" />
                LIST CLUB
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleGenericAction('Copy')}><Copy className="mr-2 h-4 w-4" />Copy</Button>
                  <Button variant="outline" size="sm" onClick={() => handleGenericAction('CSV')}><FileText className="mr-2 h-4 w-4" />CSV</Button>
                  <Button variant="outline" size="sm" onClick={() => handleGenericAction('Excel')}><FileSpreadsheet className="mr-2 h-4 w-4" />Excel</Button>
                  <Button variant="outline" size="sm" onClick={() => handleGenericAction('PDF')}><FileText className="mr-2 h-4 w-4" />PDF</Button>
                  <Button variant="outline" size="sm" onClick={() => handleGenericAction('Print')}><Printer className="mr-2 h-4 w-4" />Print</Button>
                </div>
                <div className="relative ml-auto flex items-center gap-2">
                  <label htmlFor="clubSearch" className="text-sm text-muted-foreground">Search:</label>
                  <Input
                    id="clubSearch"
                    type="search"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1);}}
                    placeholder="Search clubs..."
                    className="h-9 sm:w-[150px] md:w-[200px]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">Club Name <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">Description <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">Date <ArrowUpDown className="h-3 w-3 text-muted-foreground" /></div>
                      </TableHead>
                      <TableHead className="text-center w-[120px]">Options</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedClubs.length > 0 ? paginatedClubs.map((club, index) => (
                      <TableRow key={club.id}>
                        <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                        <TableCell className="font-medium">{club.clubName}</TableCell>
                        <TableCell>{club.description}</TableCell>
                        <TableCell>{club.date}</TableCell>
                        <TableCell className="text-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditClub(club)}
                            className="text-blue-600 hover:text-blue-700 h-8 w-8 bg-blue-100 hover:bg-blue-200 rounded-full p-1"
                            aria-label={`Edit ${club.clubName}`}
                            >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-red-600 hover:text-red-700 h-8 w-8 ml-1 bg-red-100 hover:bg-red-200 rounded-full p-1"
                                aria-label={`Delete ${club.clubName}`}
                                >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the club "{club.clubName}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteClub(club.id)} className="bg-destructive hover:bg-destructive/90">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                          No clubs found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 0 && (
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div>Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredClubs.length)} of {filteredClubs.length} entries</div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                         <Button 
                            key={pageNumber}
                            variant={currentPage === pageNumber ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => handlePageChange(pageNumber)}
                            className={`w-8 h-8 p-0 ${currentPage === pageNumber ? 'bg-purple-600 hover:bg-purple-700 text-white' : ''}`}
                          >
                        {pageNumber}
                      </Button>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="text-center text-sm text-muted-foreground pt-4">
        Bringing to you by Weblabs Developers
      </footer>
    </div>
  );
}
