import * as React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/Alert'
import { RadioGroup, RadioGroupItem } from '../../components/ui/RadioGroup'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter, TableCaption, DataTable } from '../../components/ui/Table'
import { Avatar, AvatarFallback } from '../../components/ui/Avatar'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/ui/Accordion'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/AlertDialog'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from '../../components/ui/Breadcrumb'
import { ButtonGroup } from '../../components/ui/ButtonGroup'
import { Calendar } from '../../components/ui/Calendar'
import { ChartContainer } from '../../components/ui/Chart'
import { Checkbox } from '../../components/ui/Checkbox'
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '../../components/ui/Command'
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator } from '../../components/ui/ContextMenu'
import { DatePicker } from '../../components/ui/DatePicker'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/Dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/DropdownMenu'
import { EmptyState, EmptyStateIcon, EmptyStateTitle, EmptyStateDescription, EmptyStateActions } from '../../components/ui/EmptyState'
import { FormItem, FormLabel, FormDescription } from '../../components/ui/Form'
import { Input } from '../../components/ui/Input'
import { Item, ItemIcon, ItemContent, ItemTitle, ItemDescription, ItemAction, ItemChevron } from '../../components/ui/Item'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/Popover'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../../components/ui/Pagination'
import { Progress } from '../../components/ui/Progress'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../../components/ui/Resizable'
import { SearchBar } from '../../components/ui/SearchBar'
import { Separator } from '../../components/ui/Separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '../../components/ui/Sheet'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarItem, SidebarProvider, SidebarSection, SidebarTrigger } from '../../components/ui/Sidebar'
import { Skeleton } from '../../components/ui/Skeleton'
import { Toaster } from '../../components/ui/Sonner'
import { Spinner } from '../../components/ui/Spinner'
import { Switch } from '../../components/ui/Switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs'
import { Toggle } from '../../components/ui/Toggle'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/Tooltip'
import { Typography } from '../../components/ui/Typography'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/Select'
import { Textarea } from '../../components/ui/Textarea'
import { Info, AlertCircle, MoreHorizontal, Mail, Plus, Trash, Send, Github, User, Settings, LogOut, FolderPlus, ExternalLink, CreditCard, CheckCircle, Bookmark } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts'

class SectionErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }
    render() {
        if (this.state.hasError) {
            return (
                <section className="space-y-6">
                    <div className="rounded-xl border border-destructive/50 bg-destructive/5 p-6">
                        <p className="text-sm text-destructive font-medium">⚠️ Erro ao renderizar esta seção:</p>
                        <pre className="text-xs text-muted-foreground mt-2 whitespace-pre-wrap">{this.state.error?.message}</pre>
                    </div>
                </section>
            )
        }
        return this.props.children
    }
}


export default function ComponentsPreview() {
    const { name } = useParams()
    const location = useLocation()

    React.useEffect(() => {
        if (name) {
            const element = document.getElementById(name)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [name, location.key])

    return (
        <TooltipProvider>
            <SectionErrorBoundary>
                <div className="space-y-12 pb-20">
                    <section>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Components</h1>
                        <p className="text-muted-foreground">Exemplos dos componentes implementados com os tokens Keystone.</p>
                    </section>

                    {/* Buttons */}
                    <section id="button" className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Buttons</h2>

                        <div className="space-y-8">
                            {/* Variantes de Estilo */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">Estilos e Estados</h3>
                                <div className="flex flex-wrap gap-4 items-center">
                                    <Button>Padrão</Button>
                                    <Button variant="secondary">Secundário</Button>
                                    <Button variant="outline">Outline</Button>
                                    <Button variant="ghost">Ghost</Button>
                                    <Button variant="subtle">Subtle</Button>
                                    <Button variant="destructive">Destrutivo</Button>
                                    <Button variant="link">Link</Button>
                                    <Button disabled>Desabilitado</Button>
                                </div>
                            </div>

                            {/* Variantes de Ícone */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">Com Ícone</h3>
                                <div className="flex flex-wrap gap-4 items-center">
                                    <Button>
                                        <Mail className="mr-2 h-4 w-4" /> Enviar Email
                                    </Button>
                                    <Button variant="outline">
                                        Criar Novo <Plus className="ml-2 h-4 w-4" />
                                    </Button>
                                    <Button variant="destructive">
                                        <Trash className="mr-2 h-4 w-4" /> Excluir
                                    </Button>
                                    <Button variant="subtle">
                                        <Send className="mr-2 h-4 w-4" /> Enviar Agora
                                    </Button>
                                </div>
                            </div>

                            {/* Apenas Ícone */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">Apenas Ícone</h3>
                                <div className="flex flex-wrap gap-4 items-center">
                                    <Button size="icon" variant="outline">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="secondary">
                                        <Github className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" className="rounded-full">
                                        <Plus className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Tamanhos */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">Tamanhos</h3>
                                <div className="flex flex-wrap gap-4 items-end">
                                    <Button size="sm">Pequeno (SM)</Button>
                                    <Button size="default">Padrão (MD)</Button>
                                    <Button size="lg">Grande (LG)</Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Cards */}
                    <section id="card" className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Cards</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Keystone Project</CardTitle>
                                    <CardDescription>Product development & design.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Tasks</span>
                                            <span className="font-medium">37/40</span>
                                        </div>
                                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                                            <div className="bg-primary h-full w-[92%]" />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Badge variant="outline">High Priority</Badge>
                                    <Button size="sm">View Details</Button>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>System Upgrade</CardTitle>
                                    <CardDescription>IT infrastructure maintenance.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">All systems are currently being optimized for better performance.</p>
                                </CardContent>
                                <CardFooter>
                                    <Alert variant="default" className="w-full">
                                        <Info className="size-4" />
                                        <AlertTitle>Note</AlertTitle>
                                        <AlertDescription>Scheduled for next week.</AlertDescription>
                                    </Alert>
                                </CardFooter>
                            </Card>
                        </div>
                    </section>

                    {/* Badges */}
                    <section id="badge" className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Badges</h2>
                        <div className="flex flex-wrap gap-4">
                            <Badge>Default</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="destructive">Destructive</Badge>
                            <Badge variant="outline">Outline</Badge>
                        </div>
                    </section>

                    {/* Alerts */}
                    <section id="alert" className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Alerts</h2>
                        <div className="space-y-4">
                            <Alert>
                                <Info className="size-4" />
                                <AlertTitle>Update Available</AlertTitle>
                                <AlertDescription>A new version of the system is ready to be installed.</AlertDescription>
                            </Alert>
                            <Alert variant="destructive">
                                <AlertCircle className="size-4" />
                                <AlertTitle>Critical Error</AlertTitle>
                                <AlertDescription>Esta é uma descrição de alerta destrutivo para teste.</AlertDescription>
                            </Alert>
                        </div>
                    </section>

                    {/* Radio Group */}
                    <section id="radio-group" className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Radio Group</h2>
                        <RadioGroup defaultValue="weekly">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="daily" id="daily" />
                                <label htmlFor="daily" className="text-sm font-medium leading-none cursor-pointer">Daily</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="weekly" id="weekly" />
                                <label htmlFor="weekly" className="text-sm font-medium leading-none cursor-pointer">Weekly</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="monthly" id="monthly" />
                                <label htmlFor="monthly" className="text-sm font-medium leading-none cursor-pointer">Monthly</label>
                            </div>
                        </RadioGroup>
                    </section>

                    {/* Table variants */}
                    <section id="table" className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Table Variants</h2>

                        <div className="space-y-8">
                            {/* Basic Table */}
                            <div>
                                <h3 className="text-sm font-medium mb-4 text-muted-foreground">Standard Project Table</h3>
                                <Card>
                                    <Table>
                                        <TableCaption>Recents projects and status.</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">Project</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Method</TableHead>
                                                <TableHead className="text-right">Amount</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium">Horizon Launch</TableCell>
                                                <TableCell><Badge>In Progress</Badge></TableCell>
                                                <TableCell>Credit Card</TableCell>
                                                <TableCell className="text-right">$250.00</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">System Upgrade</TableCell>
                                                <TableCell><Badge variant="secondary">Done</Badge></TableCell>
                                                <TableCell>Bank Transfer</TableCell>
                                                <TableCell className="text-right">$150.00</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Card>
                            </div>

                            {/* Rich Table with Avatars & Badges */}
                            <div>
                                <h3 className="text-sm font-medium mb-4 text-muted-foreground">Team Management (Rich Content)</h3>
                                <Card>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Member</TableHead>
                                                <TableHead>Role</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Activity</TableHead>
                                                <TableHead className="w-[50px]"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                { name: "Catherine V.", email: "catherine13@gmail.com", role: "Product Designer", status: "Active", activity: "2 mins ago" },
                                                { name: "Lucas L.", email: "lucas@dev.com", role: "Fullstack Developer", status: "Active", activity: "Just now" },
                                                { name: "Sarah M.", email: "sarah@design.com", role: "UI Designer", status: "Offline", activity: "2 hours ago" },
                                            ].map((user) => (
                                                <TableRow key={user.email}>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="h-8 w-8">
                                                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium text-sm">{user.name}</span>
                                                                <span className="text-xs text-muted-foreground">{user.email}</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-sm">{user.role}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className="text-[10px] px-1.5 py-0">
                                                            {user.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-xs text-muted-foreground">{user.activity}</TableCell>
                                                    <TableCell>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Accordion */}
                    <section id="accordion" className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Accordion</h2>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Is it styled?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It comes with default styles that matches the Keystone design system.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Is it animated?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It&apos;s animated by default, but you can disable it if you prefer.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </section>

                    {/* Alert Dialog */}
                    <section id="alert-dialog" className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Alert Dialog</h2>
                        <div className="flex flex-wrap gap-4">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline">Open Default Alert</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your
                                            account and remove your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel asChild>
                                            <Button variant="ghost">Cancel</Button>
                                        </AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <Button>Continue</Button>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">Delete Project</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="border-destructive/20">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-destructive">Critical Action Required</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            You are about to delete the &quot;Alpha Alpha&quot; project. This will remove all associated tasks, files, and collaborators.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel asChild>
                                            <Button variant="ghost">Keep Project</Button>
                                        </AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <Button variant="destructive">Confirm Deletion</Button>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </section>

                    {/* Breadcrumb */}
                    <section id="breadcrumb" className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Breadcrumb</h2>
                        <div className="space-y-4">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>

                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbEllipsis />
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Installation</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </section>

                    {/* Button Group */}
                    <section id="button-group" className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Button Group</h2>
                        <div className="flex flex-wrap gap-8">
                            <div className="space-y-2">
                                <p className="text-xs text-muted-foreground uppercase font-medium">Horizontal</p>
                                <ButtonGroup>
                                    <Button variant="ghost">Left</Button>
                                    <Button variant="ghost">Middle</Button>
                                    <Button variant="ghost" className="bg-muted/50">Right</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </section>

                    {/* Calendar & Date Picker */}
                    <section id="calendar" className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Calendar & Date Picker</h2>
                        <div className="flex flex-wrap gap-8 items-start">
                            <div className="space-y-2">
                                <p className="text-xs text-muted-foreground uppercase font-medium">Calendar</p>
                                <div className="border border-border rounded-xl bg-card p-1 inline-block shadow-sm">
                                    <Calendar mode="single" className="rounded-md" />
                                </div>
                            </div>
                            <div id="date-picker" className="space-y-2">
                                <p className="text-xs text-muted-foreground uppercase font-medium">Date Picker</p>
                                <DatePicker />
                            </div>
                        </div>
                    </section>

                    {/* Form Elements: Checkbox & Popover */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Forms & Overlays</h2>
                        <div className="flex flex-wrap gap-12 items-start">
                            <div id="checkbox" className="space-y-4">
                                <p className="text-xs text-muted-foreground uppercase font-medium">Checkbox</p>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" />
                                    <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Accept terms and conditions
                                    </label>
                                </div>
                            </div>
                            <div id="popover" className="space-y-2">
                                <p className="text-xs text-muted-foreground uppercase font-medium">Popover</p>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline">Open Popover</Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="space-y-2">
                                            <h4 className="font-medium leading-none">Dimensions</h4>
                                            <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div id="dropdown-menu" className="space-y-2">
                                <p className="text-xs text-muted-foreground uppercase font-medium">Dropdown Menu</p>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">Open Menu</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <User className="mr-2 h-4 w-4" /> Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings className="mr-2 h-4 w-4" /> Settings
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">
                                            <LogOut className="mr-2 h-4 w-4" /> Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </section>

                    {/* Dialog & Context Menu */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Modals & Context</h2>
                        <div className="flex flex-wrap gap-12 items-start">
                            <div id="dialog" className="space-y-2">
                                <p className="text-xs text-muted-foreground uppercase font-medium">Dialog (Modal)</p>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>Edit Profile</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit profile</DialogTitle>
                                            <DialogDescription>
                                                Make changes to your profile here. Click save when you&apos;re done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4 text-sm text-muted-foreground">
                                            [Aqui iria o formulário]
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Save changes</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div id="context-menu" className="space-y-2">
                                <p className="text-xs text-muted-foreground uppercase font-medium">Context Menu (Right Click)</p>
                                <ContextMenu>
                                    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                                        Right click here
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="w-64">
                                        <ContextMenuLabel>Actions</ContextMenuLabel>
                                        <ContextMenuSeparator />
                                        <ContextMenuItem>Back</ContextMenuItem>
                                        <ContextMenuItem>Forward</ContextMenuItem>
                                        <ContextMenuItem>Reload</ContextMenuItem>
                                        <ContextMenuSeparator />
                                        <ContextMenuItem inset>More Tools...</ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            </div>
                        </div>
                    </section>

                    {/* Command & Charts */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Advanced</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            <div id="command" className="space-y-2">
                                <p className="text-xs text-muted-foreground uppercase font-medium">Command Menu</p>
                                <div className="border border-border rounded-xl shadow-sm overflow-hidden">
                                    <Command>
                                        <CommandInput placeholder="Type a command or search..." />
                                        <CommandList>
                                            <CommandEmpty>No results found.</CommandEmpty>
                                            <CommandGroup heading="Suggestions">
                                                <CommandItem>Calendar</CommandItem>
                                                <CommandItem>Search Emoji</CommandItem>
                                                <CommandItem>Calculator</CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </div>
                            </div>
                            <div id="chart" className="space-y-2">
                                <p className="text-xs text-muted-foreground uppercase font-medium">Chart (Recharts)</p>
                                <div className="h-[250px] w-full border border-border rounded-xl bg-card overflow-hidden shadow-sm">
                                    <ChartContainer>
                                        <BarChart data={[
                                            { name: 'Jan', value: 400 },
                                            { name: 'Feb', value: 300 },
                                            { name: 'Mar', value: 600 },
                                            { name: 'Apr', value: 800 },
                                        ]} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                            <RechartsTooltip
                                                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                                itemStyle={{ color: 'hsl(var(--foreground))' }}
                                            />
                                            <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ChartContainer>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Data Table */}
                    <section id="data-table" className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Data Table</h2>
                        <DataTable
                            searchKey="name"
                            columns={[
                                { accessorKey: "name", header: "Name" },
                                { accessorKey: "email", header: "Email" },
                                { accessorKey: "status", header: "Status" },
                            ]}
                            data={[
                                { name: "John Doe", email: "john@example.com", status: "Active" },
                                { name: "Jane Smith", email: "jane@example.com", status: "Pending" },
                                { name: "Bob Wilson", email: "bob@example.com", status: "Inactive" },
                            ]}
                        />
                    </section>

                    {/* Empty State */}
                    <section id="empty-state" className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Empty State</h2>
                        <div className="bg-muted/10 rounded-2xl p-12 flex justify-center border border-dashed border-border/60">
                            <EmptyState className="min-h-0 border-none p-0">
                                <EmptyStateIcon>
                                    <FolderPlus className="size-6 text-foreground" />
                                </EmptyStateIcon>
                                <EmptyStateTitle>No Projects Yet</EmptyStateTitle>
                                <EmptyStateDescription>
                                    You haven&apos;t created any projects yet. Get started by creating your first project.
                                </EmptyStateDescription>
                                <EmptyStateActions>
                                    <Button>Create Project</Button>
                                    <Button variant="outline">Import Project</Button>
                                </EmptyStateActions>
                                <button className="mt-6 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
                                    Learn More <ExternalLink className="size-3" />
                                </button>
                            </EmptyState>
                        </div>
                    </section>

                    {/* Checkout Form Example */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Checkout Form (Fields Demo)</h2>
                        <div className="max-w-md bg-card border border-border rounded-2xl p-8 shadow-sm space-y-8">
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <CreditCard className="size-5" /> Payment Method
                                </h3>
                                <p className="text-sm text-muted-foreground">All transactions are secure and encrypted</p>
                            </div>

                            <div className="space-y-4">
                                <FormItem>
                                    <FormLabel>Name on Card</FormLabel>
                                    <Input placeholder="Evil Rabbit" />
                                </FormItem>

                                <FormItem>
                                    <FormLabel>Card Number</FormLabel>
                                    <Input placeholder="1234 5678 9012 3456" />
                                    <FormDescription>Enter your 16-digit card number</FormDescription>
                                </FormItem>

                                <div className="grid grid-cols-3 gap-4">
                                    <FormItem>
                                        <FormLabel>Month</FormLabel>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="MM" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="01">01</SelectItem>
                                                <SelectItem value="02">02</SelectItem>
                                                <SelectItem value="03">03</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                    <FormItem>
                                        <FormLabel>Year</FormLabel>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="YYYY" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="2025">2025</SelectItem>
                                                <SelectItem value="2026">2026</SelectItem>
                                                <SelectItem value="2027">2027</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                    <FormItem>
                                        <FormLabel>CVV</FormLabel>
                                        <Input placeholder="123" />
                                    </FormItem>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-base font-semibold">Billing Address</h3>
                                    <p className="text-sm text-muted-foreground">The billing address associated with your payment method</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Checkbox id="shipping" defaultChecked />
                                    <label htmlFor="shipping" className="text-sm font-medium">Same as shipping address</label>
                                </div>

                                <FormItem>
                                    <FormLabel>Comments</FormLabel>
                                    <Textarea placeholder="Add any additional comments" />
                                </FormItem>

                                <div className="flex items-center gap-3 pt-4">
                                    <Button className="flex-1">Submit</Button>
                                    <Button variant="outline" className="flex-1">Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Search Bar Examples */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Search Bar</h2>
                        <div className="grid gap-8 max-w-2xl">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">Standard variant</h3>
                                <SearchBar placeholder="Search projects..." />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">With results count</h3>
                                <SearchBar placeholder="Search assets..." results="12 results" />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">With initial value</h3>
                                <SearchBar defaultValue="Keystone Design" results="1 result" />
                            </div>
                        </div>
                    </section>
                    {/* Item Examples */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Items</h2>
                        <div className="grid gap-6 max-w-2xl">
                            {/* Basic Item with Action */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">Basic Item with Action</h3>
                                <Item>
                                    <ItemContent>
                                        <ItemTitle>Basic Item</ItemTitle>
                                        <ItemDescription>A simple item with title and description.</ItemDescription>
                                    </ItemContent>
                                    <ItemAction>
                                        <Button size="sm" variant="outline" className="h-8">Action</Button>
                                    </ItemAction>
                                </Item>
                            </div>

                            {/* Verified Profile Item */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">Verified Item with Chevron</h3>
                                <Item className="cursor-pointer">
                                    <ItemIcon className="bg-transparent text-foreground">
                                        <CheckCircle className="size-5" />
                                    </ItemIcon>
                                    <ItemContent>
                                        <ItemTitle className="font-medium">Your profile has been verified.</ItemTitle>
                                    </ItemContent>
                                    <ItemAction>
                                        <ItemChevron />
                                    </ItemAction>
                                </Item>
                            </div>

                            {/* Item with Avatar style icon */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">Rich Item</h3>
                                <Item>
                                    <ItemIcon className="bg-primary/10 text-primary rounded-full">
                                        <User className="size-5" />
                                    </ItemIcon>
                                    <ItemContent>
                                        <ItemTitle>Lucas Lemos</ItemTitle>
                                        <ItemDescription>Administrator • active now</ItemDescription>
                                    </ItemContent>
                                    <ItemAction>
                                        <Badge variant="secondary">Admin</Badge>
                                        <Button size="icon" variant="ghost" className="size-8">
                                            <MoreHorizontal className="size-4" />
                                        </Button>
                                    </ItemAction>
                                </Item>
                            </div>
                        </div>
                    </section>
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Pagination</h2>
                        <div className="grid gap-8 max-w-2xl">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">Standard Pagination</h3>
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink>1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink isActive>2</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink>3</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    </section>
                    {/* Progress Examples */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Progress</h2>
                        <div className="grid gap-8 max-w-2xl">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">Default (33%)</h3>
                                <Progress value={33} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">Halfway (50%)</h3>
                                <Progress value={50} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">Almost done (80%)</h3>
                                <Progress value={80} />
                            </div>
                        </div>
                    </section>
                    {/* Resizable Examples */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Resizable</h2>
                        <div className="max-w-2xl border rounded-xl overflow-hidden bg-card shadow-sm h-[200px]">
                            <ResizablePanelGroup direction="horizontal">
                                <ResizablePanel defaultSize={25}>
                                    <div className="flex h-full items-center justify-center p-6">
                                        <span className="font-semibold">Sidebar</span>
                                    </div>
                                </ResizablePanel>
                                <ResizableHandle withHandle />
                                <ResizablePanel defaultSize={75}>
                                    <div className="flex h-full items-center justify-center p-6">
                                        <span className="font-semibold">Content Area</span>
                                    </div>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </div>

                        <div className="max-w-2xl border rounded-xl overflow-hidden bg-card shadow-sm h-[300px] mt-8">
                            <ResizablePanelGroup direction="vertical">
                                <ResizablePanel defaultSize={25}>
                                    <div className="flex h-full items-center justify-center p-6">
                                        <span className="font-semibold">Top Panel</span>
                                    </div>
                                </ResizablePanel>
                                <ResizableHandle withHandle />
                                <ResizablePanel defaultSize={75}>
                                    <ResizablePanelGroup direction="horizontal">
                                        <ResizablePanel defaultSize={50}>
                                            <div className="flex h-full items-center justify-center p-6">
                                                <span className="font-semibold">Left</span>
                                            </div>
                                        </ResizablePanel>
                                        <ResizableHandle />
                                        <ResizablePanel defaultSize={50}>
                                            <div className="flex h-full items-center justify-center p-6">
                                                <span className="font-semibold">Right</span>
                                            </div>
                                        </ResizablePanel>
                                    </ResizablePanelGroup>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </div>
                    </section>
                    {/* Sheet Examples */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Sheet (Drawer)</h2>
                        <div className="flex flex-wrap gap-4">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline">Open Right Sheet</Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="sm:max-w-[440px]">
                                    <SheetHeader>
                                        <SheetTitle>Edit profile</SheetTitle>
                                        <SheetDescription>
                                            Make changes to your profile here. Click save when you&apos;re done.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid gap-6 py-8">
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                                        </FormItem>
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
                                        </FormItem>
                                    </div>
                                    <div className="flex flex-col gap-3 mt-auto">
                                        <Button type="submit" className="w-full">Save changes</Button>
                                        <SheetClose asChild>
                                            <Button variant="outline" className="w-full">Close</Button>
                                        </SheetClose>
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline">Open Left Sheet</Button>
                                </SheetTrigger>
                                <SheetContent side="left">
                                    <SheetHeader>
                                        <SheetTitle>Navigation</SheetTitle>
                                        <SheetDescription>
                                            Access your dashboard and settings.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="py-4">
                                        [Menu items would go here]
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </section>
                    {/* Skeleton Examples */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Skeleton</h2>
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    </section>

                    {/* Sidebar Examples */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Sidebar</h2>
                        <div className="max-w-4xl border border-border rounded-xl overflow-hidden bg-background h-[500px] flex shadow-sm">
                            <SidebarProvider defaultOpen={true}>
                                <Sidebar>
                                    <SidebarHeader className="border-b border-border/50">
                                        <div className="flex items-center gap-2 px-2 py-1">
                                            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">A</div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold truncate leading-none">Acme Inc</span>
                                                <span className="text-[10px] text-muted-foreground">Enterprise</span>
                                            </div>
                                            <SidebarTrigger className="ml-auto" />
                                        </div>
                                    </SidebarHeader>
                                    <SidebarContent>
                                        <SidebarSection>
                                            <SidebarItem icon={Info} label="Starred" />
                                            <SidebarItem icon={Settings} label="Settings" />
                                        </SidebarSection>
                                        <SidebarSection>
                                            <SidebarItem icon={Plus} label="Models" hasSubmenu />
                                            <SidebarItem icon={Info} label="Documentation" hasSubmenu />
                                            <SidebarItem icon={Settings} label="Settings" hasSubmenu />
                                        </SidebarSection>
                                        <SidebarSection title="Projects">
                                            <SidebarItem icon={Plus} label="Design Engineering" />
                                            <SidebarItem icon={Info} label="Sales & Marketing" />
                                        </SidebarSection>
                                    </SidebarContent>
                                    <SidebarFooter className="border-t border-border/50">
                                        <div className="flex items-center gap-2 p-1">
                                            <div className="size-8 rounded-full bg-accent flex items-center justify-center overflow-hidden">
                                                <img src="https://github.com/shadcn.png" alt="User" className="size-full object-cover" />
                                            </div>
                                            <div className="flex flex-col overflow-hidden">
                                                <span className="text-sm font-medium truncate leading-none">shadcn</span>
                                                <span className="text-[10px] text-muted-foreground truncate">m@example.com</span>
                                            </div>
                                        </div>
                                    </SidebarFooter>
                                </Sidebar>
                                <main className="flex-1 p-6 relative">
                                    <div className="flex items-center mb-6">
                                        <h1 className="text-2xl font-bold">Dashboard</h1>
                                    </div>
                                    <div className="grid gap-4">
                                        <Skeleton className="h-[120px] rounded-xl" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Skeleton className="h-[200px] rounded-xl" />
                                            <Skeleton className="h-[200px] rounded-xl" />
                                        </div>
                                    </div>
                                </main>
                            </SidebarProvider>
                        </div>
                    </section>
                    {/* Sonner Examples */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Sonner (Toast)</h2>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                variant="outline"
                                onClick={() => toast("Event has been created", {
                                    description: "Sunday, December 03, 2023 at 9:00 AM",
                                    action: {
                                        label: "Undo",
                                        onClick: () => console.log("Undo"),
                                    },
                                })}
                            >
                                Show Toast
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => toast.success("Changes saved successfully")}
                            >
                                Show Success
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => toast.error("Could not save changes")}
                            >
                                Show Error
                            </Button>
                        </div>
                    </section>

                    {/* Spinner Examples */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Spinner</h2>
                        <div className="flex items-center gap-8">
                            <div className="flex flex-col items-center gap-2">
                                <Spinner size="xs" />
                                <span className="text-[10px] text-muted-foreground uppercase">Extra Small</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner size="sm" />
                                <span className="text-[10px] text-muted-foreground uppercase">Small</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner size="md" />
                                <span className="text-[10px] text-muted-foreground uppercase">Medium</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner size="lg" />
                                <span className="text-[10px] text-muted-foreground uppercase">Large</span>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-2 border border-border rounded-full bg-card shadow-sm">
                                <Spinner size="sm" />
                                <span className="text-sm font-medium">Processing payment...</span>
                            </div>
                        </div>
                    </section>

                    {/* Switch Examples */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Switch</h2>
                        <div className="flex flex-col gap-6 max-w-sm">
                            <div className="flex items-center justify-between space-x-2">
                                <FormLabel htmlFor="airplane-mode" className="flex flex-col space-y-1">
                                    <span>Airplane Mode</span>
                                    <span className="font-normal text-xs text-muted-foreground">Disable all wireless communications</span>
                                </FormLabel>
                                <Switch id="airplane-mode" />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <FormLabel htmlFor="notifications" className="flex flex-col space-y-1">
                                    <span>Notifications</span>
                                    <span className="font-normal text-xs text-muted-foreground">Receive push notifications</span>
                                </FormLabel>
                                <Switch id="notifications" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2 opacity-50">
                                <FormLabel htmlFor="disabled" className="flex flex-col space-y-1">
                                    <span>Disabled setting</span>
                                </FormLabel>
                                <Switch id="disabled" disabled />
                            </div>
                        </div>
                    </section>

                    {/* Tabs Examples */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Tabs</h2>
                        <div className="max-w-md">
                            <Tabs defaultValue="overview" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                                    <TabsTrigger value="reports">Reports</TabsTrigger>
                                    <TabsTrigger value="settings">Settings</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview">
                                    <div className="py-6 space-y-4">
                                        <h3 className="text-lg font-bold">Overview</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            View your key metrics and recent project activity. Track progress across all your active projects.
                                        </p>
                                        <div className="pt-4 border-t text-sm font-medium">
                                            You have 12 active projects and 3 pending tasks.
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="analytics">
                                    <div className="py-6">
                                        <Skeleton className="h-[200px] rounded-lg" />
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </section>

                    {/* Table Variant Examples */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Table (Minimalist)</h2>
                        <div className="max-w-4xl py-6">
                            <Table variant="minimalist">
                                <TableHeader>
                                    <TableRow className="border-b-2">
                                        <TableHead className="w-[150px]">Invoice</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
                                        { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
                                        { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
                                        { id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
                                        { id: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
                                        { id: "INV006", status: "Pending", method: "Bank Transfer", amount: "$200.00" },
                                        { id: "INV007", status: "Unpaid", method: "Credit Card", amount: "$300.00" },
                                    ].map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell className="font-medium">{row.id}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                            <TableCell>{row.method}</TableCell>
                                            <TableCell className="text-right">{row.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter className="bg-muted/20 border-t-2">
                                    <TableRow>
                                        <TableCell colSpan={3} className="font-bold">Total</TableCell>
                                        <TableCell className="text-right font-bold">$2,500.00</TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </section>

                    {/* Typography Examples */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Typography</h2>
                        <div className="space-y-4 max-w-2xl">
                            <Typography variant="h1">Heading 1</Typography>
                            <Typography variant="h2">Heading 2</Typography>
                            <Typography variant="h3">Heading 3</Typography>
                            <Typography variant="h4">Heading 4</Typography>
                            <Typography variant="p">
                                This is a paragraph. It has a leading height that makes it easy to read for long blocks of text.
                                Antigravity design system ensures consistent spacing and readability.
                            </Typography>
                            <Typography variant="lead">
                                This is a lead paragraph, usually used for intro sections.
                            </Typography>
                            <Typography variant="blockquote">
                                &quot;The best way to predict the future is to invent it.&quot;
                            </Typography>
                            <div className="flex gap-4 items-center">
                                <Typography variant="large">Large Text</Typography>
                                <Typography variant="small">Small Text</Typography>
                                <Typography variant="muted">Muted Text</Typography>
                                <Typography variant="code">console.log(&quot;hello&quot;)</Typography>
                            </div>
                        </div>
                    </section>

                    {/* Toggle Examples */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Toggle</h2>
                        <div className="flex items-center gap-4">
                            <Toggle aria-label="Toggle italic">
                                <Bookmark className="h-4 w-4 mr-2" /> Bookmark
                            </Toggle>
                            <Toggle variant="outline" aria-label="Toggle italic">
                                <Bookmark className="h-4 w-4 mr-2" /> Bookmark
                            </Toggle>
                            <Toggle variant="outline" size="sm" aria-label="Toggle italic">
                                <Bookmark className="h-4 w-4" />
                            </Toggle>
                            <Toggle disabled>
                                Disabled
                            </Toggle>
                        </div>
                    </section>

                    {/* Tooltip Examples */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2">Tooltip</h2>
                        <div className="flex items-center gap-4">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline">Hover me</Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Add to library</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="p-2 border border-border rounded-md cursor-help">
                                        <Info className="size-4 text-muted-foreground" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>More information about this feature</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </section>

                    {/* Toaster initialization */}
                    <Toaster />
                </div>
            </SectionErrorBoundary>
        </TooltipProvider>
    )
}
