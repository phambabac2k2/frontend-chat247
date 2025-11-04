import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

const normalizeUsername = (value: string) => {
  return value
    .normalize("NFD") // tách dấu
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/[^a-zA-Z0-9_]/g, "") // chỉ cho phép a-z, A-Z, 0-9, _
    .toLowerCase(); // chuyển về thường
};

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "Tên bắt buộc phải có"),
    lastName: z.string().min(1, "Họ bắt buộc phải có"),
    username: z
      .string()
      .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự")
      .transform(normalizeUsername)
      .refine((val) => /^[a-z0-9_]+$/.test(val), {
        message: "Tên đăng nhập chỉ được chứa chữ, số hoặc dấu gạch dưới",
      }),
    email: z.email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { signUp } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormValues) => {
    const { firstName, lastName, username, email, password } = data;
    signUp(firstName, lastName, username, email, password);
    navigate("/signin");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* header logo */}
              <div className="flex flex-col items-center text-center gap-2">
                <a href="/" className="mx-auto block w-fit text-center">
                  <img src="/logo.svg" alt="logo" />
                </a>
                <h1 className="text-2xl font-bold">Tạo tài khoản Chat247</h1>
                <p className="text-muted-foreground text-balance">
                  Chào mừng bạn! Hãy đăng ký tài khoản để bắt đầu trò chuyện.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Họ</Label>
                  <Input
                    type="text"
                    id="lastName"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && (
                    <p className="text-destructive text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Tên</Label>
                  <Input
                    type="text"
                    id="firstName"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && (
                    <p className="text-destructive text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="block text-sm">Email</Label>
                <Input
                  type="text"
                  id="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="block text-sm">Tên đăng nhập</Label>
                <Input
                  type="text"
                  id="username"
                  {...register("username", { required: true })}
                  onChange={(e) => {
                    const value = e.target.value
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
                      .replace(/[^a-zA-Z0-9_]/g, "") // bỏ ký tự đặc biệt
                      .toLowerCase();
                    e.target.value = value;
                  }}
                />

                {errors.username && (
                  <p className="text-destructive text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    id="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <p className="text-destructive text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    {...register("confirmPassword", { required: true })}
                  />
                  {errors.confirmPassword && (
                    <p className="text-destructive text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Tạo tài khoản
              </Button>
              <div className="text-center text-sm">
                Đã có tài khoản?{" "}
                <a href="/signin" className="underline underline-offset-4">
                  Đăng nhập
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholderSignUp.png"
              alt="Image"
              className="absolute top-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className=" text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offetset-4">
        Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
        <a href="#">Chính sách bảo mật</a> của chúng tôi.
      </div>
    </div>
  );
}
